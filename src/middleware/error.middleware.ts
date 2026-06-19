import { Request, Response, NextFunction } from "express";
import { STATUS_INTERNAL_SERVER_ERROR } from "../constants/status/http.status";
import { AppError } from "../utils/appError";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  console.error(err);

  return res.status(STATUS_INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal server error",
  });
};
