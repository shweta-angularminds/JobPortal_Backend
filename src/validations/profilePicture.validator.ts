import { Request, Response, NextFunction } from "express";
import { STATUS_BAD_REQUEST } from "../constants/status/http.status";

export const validateProfilePicture = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.file) {
    return res.status(STATUS_BAD_REQUEST).json({
      success: false,
      message: "Profile picture is required",
    });
  }

  next();
};
