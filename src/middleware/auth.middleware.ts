import { Request, Response, NextFunction } from "express";

import {
  STATUS_FORBIDDEN,
  STATUS_UNAUTHORIZED,
} from "../constants/status/http.status";
import { verifyAccessToken } from "../utils/jwt.utils";

export default function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(STATUS_UNAUTHORIZED).json({
      success: false,
      message: "Authentication token is missing",
    });
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = {
      id: decoded.sub,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(STATUS_FORBIDDEN).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}

export const authorizeRoles = (...roles: ("jobseeker" | "employer")[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(STATUS_UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(STATUS_FORBIDDEN).json({
        success: false,
        message: "Forbidden",
      });
    }

    next();
  };
};
