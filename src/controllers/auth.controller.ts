import {
  STATUS_BAD_REQUEST,
  STATUS_CREATED,
  STATUS_DUPLICATE_KEY_ERROR,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "../constants/status/http.status";
import { employerModel } from "../models/employer.model";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { jobSeekerLoginService, jobSeekerRegisterService } from "../services/auth.service";
import { generateAccessToken } from "../utils/jwt.utils";
import { asyncHandler } from "../utils/asyncHandler";



export const employerLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await employerModel.findOne({ email: email });

    if (!user) {
      return res.status(STATUS_UNAUTHORIZED).send("User not found!");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(STATUS_UNAUTHORIZED).send("Invalid Password!");
    }

    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
      return res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send("Secret key is missing from environment variables");
    }

    const token = jwt.sign(
      {
        id: user._id,
        employer_name: user.employer_name,
        companyName: user.companyName,
        contactNumber: user.contactNumber,
        email: user.email,
        companyLogo: user.companyLogo,
        address: user.address,
        website: user.website,
      },
      secretKey,
      {
        expiresIn: "6h",
      },
    );

    res.status(STATUS_OK).json({
      message: "Login successful!",
      token: token,
    });
  } catch (error) {
    return res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Unknown error occured", error: error });
  }
};

export const employerRegister = async (
  req: Request & { file?: Express.Multer.File },
  res: Response,
) => {
  const {
    employer_name,
    email,
    companyName,
    contactNumber,
    address,
    website,
    password,
  } = req.body;

  if (
    !employer_name ||
    !email ||
    !companyName ||
    !contactNumber ||
    !address ||
    !website ||
    !password ||
    !req.file
  ) {
    return res
      .status(STATUS_BAD_REQUEST)
      .json({ message: "All fields and company logo are required!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployer = new employerModel({
      employer_name,
      email,
      companyName,
      companyLogo: req.file.path,
      contactNumber,
      address,
      website,
      password: hashedPassword,
    });

    await newEmployer.save();

    return res.status(STATUS_CREATED).json({
      message: "Employer registered successfully!",
      logoUrl: req.file.path,
    });
  } catch (error: any) {
    if (error.code === STATUS_DUPLICATE_KEY_ERROR) {
      return res.status(STATUS_BAD_REQUEST).json({
        message: "Duplicate key error: This employer already exists.",
        error: error,
      });
    }

    return res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error });
  }
};

export const jobseekerRegister = asyncHandler(
  async (req: Request, res: Response) => {
    const fresher = req.body.fresher === "true";
  
    const user = await jobSeekerRegisterService({
      username: req.body.username,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      fresher,
      resume: req.file?.path,
    });

    return res.status(STATUS_CREATED).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  },
);

export const jobseekerLogin = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await jobSeekerLoginService(email, password);

    const token = generateAccessToken({
      sub: user._id.toString(),
      role: "jobseeker",
    });

    res.status(STATUS_OK).json({
      success: true,
      message: "Login successful!",
      token: token,
    });
  },
);
