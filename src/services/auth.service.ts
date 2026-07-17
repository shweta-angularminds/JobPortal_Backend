import { STATUS_BAD_REQUEST } from "../constants/status/http.status";
import UserModel from "../models/jobseeker.model";
import bcrypt from "bcryptjs";
import { AppError } from "../utils/appError";
import { jobseekerRegisterDto } from "../constants/interfaces/jobseeker.interface";
import JobSeekerDetailsModel from "../models/jobseeker_details.model";
import { USER_FIELDS_TO_EXCLUDE } from "../constants/variables/db.constants";
import { employerModel } from "../models/employer.model";
import { RegisterEmployerDto } from "../constants/interfaces/employer.interface";

export const jobSeekerLoginService = async (
  email: string,
  password: string,
) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new AppError("Invalid email or password", STATUS_BAD_REQUEST);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid email or password", STATUS_BAD_REQUEST);
  }

  return user;
};

export const jobSeekerRegisterService = async (data: jobseekerRegisterDto) => {
  const existingUser = await UserModel.findOne({ email: data.email });

  if (existingUser) {
    throw new AppError("User already exists", STATUS_BAD_REQUEST);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await UserModel.create({
    username: data.username,
    phone: data.phone,
    email: data.email,
    password: hashedPassword,
    fresher: data.fresher,
    resume: data.resume ?? "",
  });

  await JobSeekerDetailsModel.create({
    User_id: user._id,
  });
  return UserModel.findById(user._id).select(USER_FIELDS_TO_EXCLUDE);
};

export const employerLoginService = async (email: string, password: string) => {
  const employer = await employerModel.findOne({ email });

  if (!employer) {
    throw new AppError("Invalid email or password", STATUS_BAD_REQUEST);
  }

  const isMatch = await bcrypt.compare(password, employer.password);

  if (!isMatch) {
    throw new AppError("Invalid email or password", STATUS_BAD_REQUEST);
  }

  return employer;
};

export const registerEmployerService = async (
  body: RegisterEmployerDto,
  companyLogo: string,
) => {
  const existingEmployer = await employerModel.findOne({ email: body.email });

  if (existingEmployer) {
    throw new AppError("Employer already exists", STATUS_BAD_REQUEST);
  }
  const hashedPassword = await bcrypt.hash(body.password, 10);

  const employer = await employerModel.create({
    ...body,
    password: hashedPassword,
    companyLogo,
  });

  return employerModel.findById(employer._id).select(USER_FIELDS_TO_EXCLUDE);
};
