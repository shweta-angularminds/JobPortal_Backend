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
import JobSeekerDetailsModel from "../models/jobseeker_details.model";
import UserModel from "../models/user.model";

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
      }
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

export const employerRegister = async (req: Request, res: Response) => {
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

export const jobseekerRegister = async (req: Request, res: Response) => {
  const { username, phone, email, password } = req.body;

  const fresher = req.body.fresher === "true";

  const resumeFile = req.file;

  try {
    if (!username || !password || !phone || !email || !resumeFile) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "All fields are required" });
    }

    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      return res
        .status(STATUS_DUPLICATE_KEY_ERROR)
        .json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      phone,
      email,
      fresher,
      password: hashedPassword,
      resume: resumeFile ? resumeFile.path : "",
    });

    const savedUser = await newUser.save();

    const newJobSeekerDetails = new JobSeekerDetailsModel({
      User_id: savedUser._id,
      languages: [],
      skills: [],
      education: {},
      summary: "",
      internship: {},
      preference: {},
    });

    newJobSeekerDetails.education = {};

    await newJobSeekerDetails.save();

    res
      .status(STATUS_CREATED)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ error: err, message: err });
  }
};

export const jobseekerLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

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
        username: user.username,
        email: user.email,
        contactNumber: user.phone,
        fresher: user.fresher,
        resume: user.resume,
        location: user.location,
        gender: user.gender,
        bdate: user.bdate,
        profilePic: user.profilePic,
      },
      secretKey,
      {
        expiresIn: "1d",
      }
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
