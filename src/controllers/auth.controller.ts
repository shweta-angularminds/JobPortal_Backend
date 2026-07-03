import { STATUS_CREATED, STATUS_OK } from "../constants/status/http.status";
import { Request, Response } from "express";

import {
  employerLoginService,
  jobSeekerLoginService,
  jobSeekerRegisterService,
  registerEmployerService,
} from "../services/auth.service";
import { generateAccessToken } from "../utils/jwt.utils";
import { asyncHandler } from "../utils/asyncHandler";

export const employerLogin = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const employer = await employerLoginService(email, password);

    const token = generateAccessToken({
      sub: employer._id.toString(),
      role: "employer",
    });

    res.status(STATUS_OK).json({
      success: true,
      message: "Login successful!",
      token: token,
    });
  },
);

export const employerRegister = asyncHandler(
  async (req: Request & { file?: Express.Multer.File }, res: Response) => {
    const employer = await registerEmployerService(req.body, req.file!.path);

    return res.status(STATUS_CREATED).json({
      message: "Employer registered successfully",
      data: employer,
    });
  },
);

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
