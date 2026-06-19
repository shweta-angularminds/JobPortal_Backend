import JobSeekerDetailsModel from "../models/jobseeker_details.model";
import { AppError } from "../utils/appError";
import {
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
} from "../constants/status/http.status";
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

export const addSkillService = async (userId: string, skill: string) => {
  const jobSeeker = await findJobSeekerDetailsOrThrow(userId);

  if (jobSeeker.skills.includes(skill)) {
    throw new AppError("Skill already exists", STATUS_BAD_REQUEST);
  }
  jobSeeker.skills.push(skill);
  await jobSeeker.save();
  return jobSeeker;
};

export const deleteSkillService = async (userId: string, skill: string) => {
  const updatedJobSeeker = await JobSeekerDetailsModel.findOneAndUpdate(
    { User_id: userId },
    { $pull: { skills: skill } },
    { new: true },
  );

  if (!updatedJobSeeker) {
    throw new AppError("Job seeker details not found", STATUS_NOT_FOUND);
  }

  return updatedJobSeeker.skills;
};

export const addLanguageService = async (userId: string, language: string) => {
  const jobSeeker = await findJobSeekerDetailsOrThrow(userId);

  if (jobSeeker.languages.includes(language)) {
    throw new AppError("Language already exists", STATUS_BAD_REQUEST);
  }

  jobSeeker.languages.push(language);

  await jobSeeker.save();

  return jobSeeker.languages;
};

export const deleteLanguageService = async (
  userId: string,
  language: string,
) => {
  const jobSeeker = await findJobSeekerDetailsOrThrow(userId);

  if (!jobSeeker.languages.includes(language)) {
    throw new AppError("Language not found", STATUS_NOT_FOUND);
  }

  jobSeeker.languages = jobSeeker.languages.filter((lang) => lang !== language);

  await jobSeeker.save();

  return jobSeeker.languages;
};