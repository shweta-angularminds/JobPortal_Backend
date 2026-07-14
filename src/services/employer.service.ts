import {
  ChangePasswordDto,
  GetEmployersInput,
  UpdateEmployerDto,
} from "../constants/interfaces/employer.interface";
import {
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_UNAUTHORIZED,
} from "../constants/status/http.status";
import { USER_FIELDS_TO_EXCLUDE } from "../constants/db.constants";
import { employerModel } from "../models/employer.model";
import { AppError } from "../utils/appError";

import bcrypt from "bcryptjs";

export const getAllEmployersService = async ({
  page,
  limit,
  search,
}: GetEmployersInput) => {
  const query: Record<string, unknown> = {};

  if (search?.trim()) {
    query.companyName = {
      $regex: search.trim(),
      $options: "i",
    };
  }

  const total = await employerModel.countDocuments(query);

  const data = await employerModel
    .find(query)
    .select("-password -createdAt -updatedAt -__v")
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getProfileService = async (userId: string) => {
  const user = await employerModel
    .findById(userId)
    .select(USER_FIELDS_TO_EXCLUDE)
    .orFail(() => new AppError("User not found", STATUS_NOT_FOUND));

  return user;
};

export const updateProfileService = async (
  id: string,
  body: UpdateEmployerDto,
  companyLogo?: string,
) => {
  return employerModel
    .findByIdAndUpdate(
      id,
      {
        ...body,
        companyLogo,
      },
      {
        new: true,
      },
    )
    .select(USER_FIELDS_TO_EXCLUDE)
    .orFail(() => new AppError("User not found", STATUS_NOT_FOUND));
};

export const changePasswordService = async (
  userId: string,
  body: ChangePasswordDto,
) => {
  const employer = await employerModel.findById(userId);

  if (!employer) {
    throw new AppError("Employer not found", STATUS_BAD_REQUEST);
  }

  const isMatch = await bcrypt.compare(body.password, employer.password);

  if (!isMatch) {
    throw new AppError("Current password is incorrect", STATUS_UNAUTHORIZED);
  }

  employer.password = await bcrypt.hash(body.newPassword, 10);

  await employer.save();
};

export const getEmployerByIdService = async (id: string) => {
  const employer = await employerModel
    .findById(id)
    .select(USER_FIELDS_TO_EXCLUDE);

  if (!employer) {
    throw new AppError("Employer not found", STATUS_BAD_REQUEST);
  }

  return employer;
};
