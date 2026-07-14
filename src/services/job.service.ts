import mongoose from "mongoose";
import {
  CreateJobParams,
  GetCandidateDetailsParams,
  GetJobsParams,
  UpdateJobParams,
} from "../constants/interfaces/jobs.interface";
import { jobModel } from "../models/job.model";
import JobSeekerDetailsModel from "../models/jobseeker_details.model";
import { AppError } from "../utils/appError";
import {
  STATUS_FORBIDDEN,
  STATUS_NOT_FOUND,
} from "../constants/status/http.status";

type GetCompanyJobsParams = {
  employerId: string;
  experience?: string;
  department?: string;
  limit: number;
};

const { ObjectId } = mongoose.Types;

export const listJobsByEmployerService = async ({
  employerId,
  experience,
  department,
  limit,
}: GetCompanyJobsParams) => {
  const query: any = {
    employer_id: employerId,
  };

  if (experience) {
    query.experience = experience;
  }

  if (department) {
    query.department = department;
  }

  return jobModel.find(query).select("-__v").limit(limit);
};

export const getJobByIdService = async (jobId: string) => {
  return await jobModel.findById(jobId);
};

export const listJobsService = async ({
  search,
  location,
  experience,
  employementType,
  page,
  limit,
}: GetJobsParams) => {
  const query: any = {};

  if (search) {
    query.$or = [
      { designation: { $regex: search, $options: "i" } },
      { skills: { $regex: search, $options: "i" } },
    ];
  }

  if (location) {
    query.location = location;
  }

  if (experience) {
    query.experience = experience;
  }

  if (employementType) {
    query.employementType = employementType;
  }

  const [jobs, total] = await Promise.all([
    jobModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }),

    jobModel.countDocuments(query),
  ]);

  return {
    jobs,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

// _______________________ EMPLOYER JOB SERVICES __________________

export const listEmployerJobsService = async (employerId: string) => {
  return jobModel.find({ employer_id: employerId });
};

export const createJobService = async (jobData: CreateJobParams) => {
  const job = await jobModel.create(jobData);

  return job;
};

export const updateJobService = async ({ id, ...jobData }: UpdateJobParams) => {
  return jobModel.findByIdAndUpdate(id, jobData, {
    new: true,
    runValidators: true,
  });
};

export const deleteJobService = async (jobId: string) => {
  return jobModel.findByIdAndDelete(jobId);
};

export const getCandidateDetailsService = async ({
  employerId,
  jobId,
  candidateId,
}: GetCandidateDetailsParams) => {
  const job = await jobModel.findOne({
    _id: jobId,
    employer_id: employerId,
  });

  if (!job) {
    throw new AppError(
      "You are not authorized to view candidates for this job.",
      STATUS_FORBIDDEN,
    );
  }

  const candidate = await JobSeekerDetailsModel.aggregate([
    {
      $match: {
        User_id: new ObjectId(candidateId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "User_id",
        foreignField: "_id",
        as: "user_info",
      },
    },
    {
      $unwind: "$user_info",
    },
    {
      $project: {
        "user_info.password": 0,
        "user_info.createdAt": 0,
        "user_info.updatedAt": 0,
        "user_info.__v": 0,
        "user_info._id": 0,
        "user_info.resume": 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        _id: 0,
        User_id: 0,
      },
    },
  ]);

  if (candidate.length === 0) {
    throw new AppError("Candidate not found.", STATUS_NOT_FOUND);
  }

  return candidate[0];
};
