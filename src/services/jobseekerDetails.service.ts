import JobSeekerDetailsModel from "../models/jobseeker_details.model";
import { AppError } from "../utils/appError";
import { STATUS_NOT_FOUND } from "../constants/status/http.status";
import { EducationField } from "../constants/jobseeker.constants";

const findJobSeekerDetailsOrThrow = async (userId: string) => {
  const details = await JobSeekerDetailsModel.findOne({
    User_id: userId,
  });

  if (!details) {
    throw new AppError("Job seeker details not found", STATUS_NOT_FOUND);
  }

  return details;
};

export const getJobseekerDetailsService = async (userId: string) => {
  const details = await JobSeekerDetailsModel.findOne({
    User_id: userId,
  }).lean();

  if (!details) {
    throw new AppError("Job seeker details not found", STATUS_NOT_FOUND);
  }

  return details;
};

export const addEducationService = async (
  userId: string,
  educationField: EducationField,
  educationData: any,
) => {
  const jobSeeker = await findJobSeekerDetailsOrThrow(userId);

  jobSeeker.education ??= {};

  jobSeeker.education[educationField] = educationData;

  await jobSeeker.save();

  return jobSeeker;
};


