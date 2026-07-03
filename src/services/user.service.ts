import { UpdateProfileDto } from "../constants/interfaces/user.interface";
import { STATUS_NOT_FOUND } from "../constants/status/http.status";
import { USER_FIELDS_TO_EXCLUDE } from "../constants/db.constants";
import UserModel from "../models/user.model";
import { AppError } from "../utils/appError";
import {
  deleteImageFromCloudinary,
  deleteRawFileFromCloudinary,
} from "./cloudinary.service";

const findUserOrThrow = async (userId: string) => {
  const user = await UserModel.findById(userId).orFail(
    () => new AppError("User not found", STATUS_NOT_FOUND),
  );

  return user;
};

export const getProfileService = async (userId: string) => {
  const user = await UserModel.findById(userId)
    .select(USER_FIELDS_TO_EXCLUDE)
    .orFail(() => new AppError("User not found", STATUS_NOT_FOUND));

  return user;
};

export const updateProfileService = async (
  userId: string,
  data: UpdateProfileDto,
) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { $set: data },
    {
      new: true,
      runValidators: true,
    },
  )
    .select(USER_FIELDS_TO_EXCLUDE)
    .orFail(() => new AppError("User not found", STATUS_NOT_FOUND));

  return updatedUser;
};

export const updateProfilePictureService = async (
  userId: string,
  newProfilePic: string,
) => {
  const user = await findUserOrThrow(userId);

  const oldProfilePic = user.profilePic;

  user.profilePic = newProfilePic;
  await user.save();

  if (oldProfilePic) {
    await deleteImageFromCloudinary(oldProfilePic);
  }

  return UserModel.findById(userId).select(USER_FIELDS_TO_EXCLUDE);
};

export const deleteProfilePictureService = async (userId: string) => {
  const user = await findUserOrThrow(userId);
  const oldProfilePic = user.profilePic;

  user.profilePic = undefined;

  await user.save();

  if (oldProfilePic) {
    await deleteImageFromCloudinary(oldProfilePic);
  }

  return UserModel.findById(userId).select(USER_FIELDS_TO_EXCLUDE);
};

export const updateResumeService = async (userId: string, resume: string) => {
  const user = await findUserOrThrow(userId);
  const oldResume = user.resume;

  user.resume = resume;
  await user.save();

  if (oldResume) {
    await deleteRawFileFromCloudinary(oldResume);
  }
  return UserModel.findById(userId).select(USER_FIELDS_TO_EXCLUDE);
};
