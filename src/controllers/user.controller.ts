import {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "../constants/status/http.status";
import { Request, Response } from "express";
import UserModel from "../models/user.model";
import jwt from "jsonwebtoken";

export const getProfile = async (req: Request, res: Response) => {
  try {
    res.status(STATUS_OK).json({ user: req.user });
  } catch (error) {
    return res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching profile", error });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user || !user.id) {
      return res
        .status(STATUS_UNAUTHORIZED)
        .send({ message: "User not authenticated." });
    }

    const userId = user.id;
    const { email, phone, username, bdate, gender, location } = req.body;
    const userData = UserModel.findById(userId);

    if (!userData) {
      return res.status(STATUS_NOT_FOUND).json({
        message: "User not found!",
      });
    }

    const updateData: any = {};

    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (username) updateData.username = username;
    if (bdate) updateData.bdate = bdate;
    if (gender) updateData.gender = gender;
    if (location) updateData.location = location;

    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password -__v -createdAt -updatedAt");

    if (!updatedUser) {
      return res.status(STATUS_NOT_FOUND).json({ message: "User not found" });
    }
    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
      return res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send("Secret key is missing from environment variables");
    }

    const token = jwt.sign(
      {
        id: updatedUser._id,
        email: updatedUser.email,
        username: updatedUser.username,
        location: updatedUser.location,
        contactNumber: updatedUser.phone,
        bdate: updatedUser.bdate,
        gender: updatedUser.gender,
        profilePic: updatedUser.profilePic,
      },
      secretKey,
      { expiresIn: "1d" }
    );

    res.status(STATUS_OK).json({
      message: "User profile updated successfully",
      user: updatedUser,
      token,
    });
  } catch (error) {
    return res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error", error: error });
  }
};

export const updateProfilePicture = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user || !user.id) {
      return res
        .status(STATUS_UNAUTHORIZED)
        .send({ message: "User not authenticated." });
    }

    const userId = user.id;
    const userData = await UserModel.findById(userId);

    if (!userData) {
      return res.status(STATUS_NOT_FOUND).json({
        message: "User not found!",
      });
    }

    const updateData: any = {};

    if (req.file) {
      updateData.profilePic = req.file.path;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password -createdAt -updatedAt -__v");

    if (!updatedUser) {
      return res.status(STATUS_NOT_FOUND).json({ message: "User not found" });
    }

    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
      return res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send("Secret key is missing from environment variables");
    }

    const token = jwt.sign(
      {
        id: updatedUser._id,
        email: updatedUser.email,
        username: updatedUser.username,
        location: updatedUser.location,
        contactNumber: updatedUser.phone,
        bdate: updatedUser.bdate,
        gender: updatedUser.gender,
        profilePic: updatedUser.profilePic,
      },
      secretKey,
      { expiresIn: "1d" }
    );

    res.status(STATUS_OK).json({
      message: "Profile picture updated successfully",
      user: updatedUser,
      token,
    });
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).send({
      message: "An error occurred while uploading the profile picture.",
    });
  }
};

export const deleteProfilePicture = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user || !user.id) {
      return res
        .status(STATUS_UNAUTHORIZED)
        .send({ message: "User not authenticated." });
    }

    const userId = user.id;
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $unset: { profilePic: "" } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(STATUS_NOT_FOUND).json({ message: "User not found" });
    }

    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
      return res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send("Secret key is missing from environment variables");
    }

    const token = jwt.sign(
      {
        id: updatedUser._id,
        email: updatedUser.email,
        username: updatedUser.username,
        location: updatedUser.location,
        contactNumber: updatedUser.phone,
        bdate: updatedUser.bdate,
        gender: updatedUser.gender,
        profilePic: updatedUser.profilePic,
      },
      secretKey,
      { expiresIn: "1d" }
    );

    return res
      .status(STATUS_OK)
      .json({ message: "Profile Picture deleted succesfully!", token });
  } catch (error) {
    return res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Intrenal server Error", error: error });
  }
};

export const updateResume = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const userData = await UserModel.findOne({ _id: userId });

    if (!userData) {
      return res.status(STATUS_NOT_FOUND).json({
        message: "User not found!",
      });
    }

    const updateData: any = {};

    if (req.file) {
      updateData.resume = req.file.path;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password -__v -createdAt -updatedAt");

    if (!updatedUser) {
      return res.status(STATUS_NOT_FOUND).json({ message: "User not found" });
    }

    res.status(STATUS_OK).json({
      message: "Resume updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).send({
      message: "An error occurred while updating the resume.",
      error: error,
    });
  }
};