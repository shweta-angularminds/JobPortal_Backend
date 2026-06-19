import {
  STATUS_OK,
} from "../constants/status/http.status";
import { Request, Response } from "express";

import {
  deleteProfilePictureService,
  getProfileService,
  updateProfilePictureService,
  updateProfileService,
  updateResumeService,
} from "../services/user.service";

import { asyncHandler } from "../utils/asyncHandler";

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await getProfileService(req.user!.id);

  return res.status(STATUS_OK).json({
    success: true,
    data: user,
  });
});

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const updatedUser = await updateProfileService(userId, req.body);

    return res.status(STATUS_OK).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  },
);

export const updateProfilePicture = asyncHandler(
  async (req: Request, res: Response) => {
    const updatedUser = await updateProfilePictureService(
      req.user!.id,
      req.file!.path,
    );
    return res.status(STATUS_OK).json({
      success: true,
      message: "Profile picture updated successfully",
      data: updatedUser,
    });
  },
);

export const deleteProfilePicture = asyncHandler(
  async (req: Request, res: Response) => {
    const updatedUser = await deleteProfilePictureService(req.user!.id);

    return res.status(STATUS_OK).json({
      success: true,
      message: "Profile picture deleted successfully",
      data: updatedUser,
    });
  },
);

export const updateResume = asyncHandler(
  async (req: Request, res: Response) => {
    const updatedUser = await updateResumeService(req.user!.id, req.file!.path);
    return res.status(STATUS_OK).json({
      success: true,
      message: "Resume updated successfully",
      data: updatedUser,
    });
  },
);
