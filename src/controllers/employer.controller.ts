import { Request, Response } from "express";

import { GetEmployersQuery } from "../constants/interfaces/employer.interface";
import { STATUS_OK } from "../constants/status/http.status";

import {
  changePasswordService,
  getAllEmployersService,
  getEmployerByIdService,
  getProfileService,
  updateProfileService,
} from "../services/employer.service";

import { asyncHandler } from "../utils/asyncHandler";

export const getAllEmployers = asyncHandler(
  async (req: Request, res: Response) => {
    const { page = "1", limit = "10", search } = req.query as GetEmployersQuery;

    const employers = await getAllEmployersService({
      page: Number(page),
      limit: Number(limit),
      search,
    });
    res.status(STATUS_OK).json(employers);
  },
);

export const employerProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const employer = await getProfileService(req.user!.id);

    return res.status(STATUS_OK).json({
      success: true,
      data: employer,
    });
  },
);

export const updateEmployerDetails = asyncHandler(
  async (req: Request & { file?: Express.Multer.File }, res: Response) => {
    const userId = req.user!.id;

    const companyLogo = req.file?.path ?? req.body.companyLogo;

    const employer = await updateProfileService(userId, req.body, companyLogo);

    return res.status(STATUS_OK).json({
      message: "Profile updated successfully",
      data: employer,
    });
  },
);

export const changePassword = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;

    await changePasswordService(userId, req.body);

    return res.status(STATUS_OK).json({
      message: "Password updated successfully",
    });
  },
);

export const getEmployerById = asyncHandler(
  async (req: Request, res: Response) => {
    const employer = await getEmployerByIdService(req.params.id);

    return res.status(STATUS_OK).json({
      data: employer,
    });
  },
);
