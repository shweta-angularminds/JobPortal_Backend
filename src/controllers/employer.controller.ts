import {
  STATUS_BAD_REQUEST,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "../constants/status/http.status";
import { Request, Response } from "express";
import { employerModel } from "../models/employer.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const employerProfile = async (req: Request, res: Response) => {
  try {
    res.status(STATUS_OK).json({ user: req.user });
  } catch (error) {
    return res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching profile", error });
  }
};

export const updateEmployerDetails = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user || !user.id) {
    return res
      .status(STATUS_UNAUTHORIZED)
      .send({ message: "User not authenticated." });
  }

  const userId = user.id;

  const { employer_name, email, companyName, contactNumber, address, website } =
    req.body;

  if (!employer_name) {
    return res
      .status(STATUS_BAD_REQUEST)
      .json({ message: "Employer name is required!" });
  }
  if (!email) {
    return res
      .status(STATUS_BAD_REQUEST)
      .json({ message: "Email is required!" });
  }
  if (!companyName) {
    return res
      .status(STATUS_BAD_REQUEST)
      .json({ message: "Company name is required!" });
  }
  if (!contactNumber) {
    return res
      .status(STATUS_BAD_REQUEST)
      .json({ message: "Contact number is required!" });
  }
  if (!address) {
    return res
      .status(STATUS_BAD_REQUEST)
      .json({ message: "Address is required!" });
  }
  if (!website) {
    return res
      .status(STATUS_BAD_REQUEST)
      .json({ message: "Website url is required!" });
  }

  let companyLogo = req.body.companyLogo;

  if (req.file) {
    companyLogo = req.file.path;
  }

  try {
    const updatedEmployer = await employerModel.findByIdAndUpdate(
      userId,
      {
        employer_name: employer_name,
        email: email,
        companyName: companyName,
        companyLogo: companyLogo,
        contactNumber: contactNumber,
        address: address,
        website: website,
      },
      { new: true }
    );

    if (!updatedEmployer) {
      return res
        .status(STATUS_NOT_FOUND)
        .json({ message: "Employer not found" });
    }

    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
      return res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send("Secret key is missing from environment variables");
    }

    const token = jwt.sign(
      {
        id: updatedEmployer._id,
        email: updatedEmployer.email,
        employer_name: updatedEmployer.employer_name,
        companyName: updatedEmployer.companyName,
        contactNumber: updatedEmployer.contactNumber,
        address: updatedEmployer.address,
        website: updatedEmployer.website,
        companyLogo: updatedEmployer.companyLogo,
      },
      secretKey,
      { expiresIn: "1d" }
    );

    res.status(STATUS_OK).json({
      message: "Profile updated successfully",
      updatedEmployer,
      token,
    });
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while updating employer",
      error: error,
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { password, newPassword } = req.body;
  const user = req.user;

  if (!user || !user.id) {
    return res.status(STATUS_UNAUTHORIZED).send("User not authenticated.");
  }

  const userId = user.id;

  try {
    const foundUser = await employerModel.findById(userId);
    if (!foundUser) {
      return res.status(STATUS_UNAUTHORIZED).send("User not found!");
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
      return res.status(STATUS_UNAUTHORIZED).send("Invalid password!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    foundUser.password = hashedPassword;

    await foundUser.save();

    res.status(STATUS_OK).json({ message: "Password updated successfully!" });
  } catch (error) {
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while updating the password." });
  }
};

export const getAllEmployers = async (req: Request, res: Response) => {
  try {
    const employers = await employerModel
      .find()
      .select("-password -createdAt -updatedAt -__v");
    if (!employers || employers.length === 0) {
      return res
        .status(STATUS_NOT_FOUND)
        .json({ message: "No employers found" });
    }
    res.json(employers);
  } catch (error) {
    return res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export const getEmployerById = async (req: Request, res: Response) => {
  try {
    const employerId = req.params.id;
    const employer = await employerModel
      .findById(employerId)
      .select("-password -createdAt -updatedAt -__v");

    if (!employer) {
      return res
        .status(STATUS_NOT_FOUND)
        .json({ message: `Employer not found with ID - ${employerId}` });
    }

    return res.status(STATUS_OK).send(employer);
  } catch (error) {
    return res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Unexpected error occurred!" });
  }
};
