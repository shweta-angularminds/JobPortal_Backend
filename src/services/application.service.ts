import { applicationModel } from "../models/application.model";
import {
  ApplicationResponse,
  type GetAllApplicationsResponse,
  type
  GetAllApplicationsInput,
} from "../constants/interfaces/application.interface";
import { AppError } from "../utils/appError";
import { STATUS_OK } from "../constants/status/http.status";
import mongoose from "mongoose";

export const getAllApplicationService = async ({
  userId,
  page,
  limit,
  search,
  status,
}: GetAllApplicationsInput): Promise<GetAllApplicationsResponse> => {
  const pipeline: mongoose.PipelineStage[] = [
    {
      $match: {
        user_Id: new mongoose.Types.ObjectId(userId),
      },
    },

    {
      $lookup: {
        from: "jobs",
        localField: "job_Id",
        foreignField: "_id",
        as: "job",
      },
    },

    {
      $unwind: "$job",
    },

    {
      $lookup: {
        from: "employers",
        localField: "job.employer_id",
        foreignField: "_id",
        as: "employer",
      },
    },

    {
      $unwind: "$employer",
    },
  ];

  // Search Filter
  if (search) {
    pipeline.push({
      $match: {
        $or: [
          {
            "job.designation": {
              $regex: search,
              $options: "i",
            },
          },
          {
            "employer.companyName": {
              $regex: search,
              $options: "i",
            },
          },
        ],
      },
    });
  }

  // Status Filter
  if (status) {
    pipeline.push({
      $match: {
        status,
      },
    });
  }

  // Count Total Records
  const totalResult = await applicationModel.aggregate([
    ...pipeline,
    {
      $count: "total",
    },
  ]);

  const total = totalResult[0]?.total ?? 0;

  // Pagination + Projection
  pipeline.push(
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $skip: (page - 1) * limit,
    },
    {
      $limit: limit,
    },
    {
      $project: {
        _id: 0,
        application_id: "$_id",
        job_id: "$job._id",
        designation: "$job.designation",
        company_name: "$employer.companyName",
        createdAt: 1,
        updatedAt: 1,
        status: 1,
      },
    },
  );

  const data = await applicationModel.aggregate<ApplicationResponse>(pipeline);

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

export const applyJobService = async (job_Id: string, user_Id: string) => {
  const alreadyApplied = await applicationModel.exists({
    job_Id,
    user_Id,
  });
  if (alreadyApplied) {
    throw new AppError("Already Applied",STATUS_OK);
  }
  const application = await applicationModel.create({
    job_Id,
    user_Id,
    status: "pending",
  });

  return application;
};

export const checkJobAppliedService = async (userId: string, jobId: string) => {
  const exists = await applicationModel.exists({
    user_Id: userId,
    job_Id: jobId,
  });

  return !!exists;
};
