import { Request, Response, NextFunction } from "express";
import {
  STATUS_BAD_REQUEST,
  STATUS_INTERNAL_SERVER_ERROR,
} from "../constants/status/http.status";
import { AppError } from "../utils/appError";
import { MongoServerError } from "mongodb";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Mongo duplicate key
  if (err instanceof MongoServerError && err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    const value = err.keyValue[field];

    return res.status(STATUS_BAD_REQUEST).json({
      success: false,
      message: `${field} "${value}" already exists.`,
    });
  }
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
