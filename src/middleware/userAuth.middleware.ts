
import { Request, Response, NextFunction } from "express";

import {
  STATUS_UNAUTHORIZED,
} from "../constants/status/http.status";
import { verifyAccessToken } from "../utils/jwt.utils";

function authenticateUserToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.method === "OPTIONS") {
    return next();
  }
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    if (!token) {
      return res
        .status(STATUS_UNAUTHORIZED)
        .send({ message: "Authentication token is missing!" });
    }
  }

  const decoded = verifyAccessToken(token);

  req.user = {
    id: decoded.sub,
    role: decoded.role,
  };

  next();
}

export default authenticateUserToken;
