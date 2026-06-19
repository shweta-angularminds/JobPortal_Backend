import { STATUS_BAD_REQUEST } from "../constants/status/http.status";
import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";
import { AppError } from "../utils/appError";

export const loginUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new AppError("INVALID_CREDENTIALS",STATUS_BAD_REQUEST);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("INVALID_CREDENTIALS",STATUS_BAD_REQUEST);
  }

  return user;
};
