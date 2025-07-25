import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import {
  STATUS_FORBIDDEN,
  STATUS_UNAUTHORIZED,
} from "../constants/status/http.status";


interface MyJwtPayload extends JwtPayload {
  userId: string;
  email: string;
  employer_name: string;

  companyName: string;
  companyLogo: string;
  contactNumber: string;
  address: string;
  website: string;
}


function verifyAccessToken(token: string) {
  const secret = process.env.SECRET_KEY;

  if (!secret) {
    throw new Error("SECRET_KEY is not defined in environment variables.");
  }
  try {
    const decoded = jwt.verify(token, secret) as MyJwtPayload;
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error };
  }
}


function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

 
    if (!token) {
      return res
        .status(STATUS_UNAUTHORIZED)
        .send({ message: "Authentication token is missing!" });
    }
  

  const result = verifyAccessToken(token);

  if (!result.success) {
    return res
      .status(STATUS_FORBIDDEN)
      .json({ message: "Unauthorized Request", error: result.error }); 
  }

  req.user = result.data; 
  next(); 
}

export default authenticateToken; 
