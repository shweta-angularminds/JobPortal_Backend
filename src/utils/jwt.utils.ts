import jwt from "jsonwebtoken";
import { JwtPayload } from "../constants/interfaces/auth.interface";
import { STATUS_INTERNAL_SERVER_ERROR } from "../constants/status/http.status";
import { AppError } from "./appError";

export const generateAccessToken = (payload: JwtPayload) => {
  const secretKey = process.env.SECRET_KEY;

  if (!secretKey) {
    throw new AppError("SECRET_KEY_NOT_FOUND", STATUS_INTERNAL_SERVER_ERROR);
  }

  return jwt.sign(payload, secretKey, {
    expiresIn: "1d",
  });
};

export const verifyAccessToken = (token: string): JwtPayload => {
  const secret = process.env.SECRET_KEY;

  if (!secret) {
    throw new AppError("SECRET_KEY_NOT_FOUND",STATUS_INTERNAL_SERVER_ERROR);
  }

  return jwt.verify(token, secret) as JwtPayload;
};
