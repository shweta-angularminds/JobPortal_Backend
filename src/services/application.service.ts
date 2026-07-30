import { applicationModel } from "../models/application.model";
import { ObjectId } from "mongodb";
import {
  ApplicationResponse,
  type GetAllApplicationsResponse,
  type GetAllApplicationsInput,
} from "../constants/interfaces/application.interface";
import { AppError } from "../utils/appError";
import { STATUS_NOT_FOUND, STATUS_OK } from "../constants/status/http.status";
import mongoose from "mongoose";
import { employerModel } from "../models/employer.model";
import { jobModel } from "../models/job.model";
import UserModel from "../models/jobseeker.model";

// ___________________ JOBSEEKER ____________________

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
    throw new AppError("Already Applied", STATUS_OK);
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

// ________________________ EMPLOYER ____________________

export const getApplicationDetailsService = async (id: string) => {
  const application = await applicationModel
    .findById(id)
    .select("job_Id createdAt updatedAt");

  if (!application) {
    throw new AppError("Application not found", STATUS_NOT_FOUND);
  }

  const job = await jobModel
    .findById(application.job_Id)
    .select("designation employer_id");

  if (!job) {
    throw new AppError("Job not found", STATUS_NOT_FOUND);
  }

  const employer = await employerModel
    .findById(job.employer_id)
    .select("companyName");

  if (!employer) {
    throw new AppError("Employer not found", STATUS_NOT_FOUND);
  }

  return {
    application_id: application._id,
    designation: job.designation,
    job_id: application.job_Id,
    createdAt: application.createdAt,
    updatedAt: application.updatedAt,
    company_name: employer.companyName,
  };
};



export const getJobApplicationsService = async ({
  jobId,
  page,
  limit,
  status,
}: {
  jobId: string;
  page: number;
  limit: number;
  status?: string;
}) => {
  const job = await jobModel.findById(jobId).select("designation");

  if (!job) {
    throw new AppError("Job not found", STATUS_NOT_FOUND);
  }

  const skip = (page - 1) * limit;
  const statusFilter = status ? { status } : {};

  const applications = await applicationModel
    .find({
      job_Id: jobId,
      ...statusFilter,
    })
    .skip(skip)
    .limit(limit)
    .lean();

  if (!applications.length) {
    return {
      job,
      totalApplicants: 0,
      page,
      limit,
      applicants: [],
    };
  }

  const totalApplicants = await applicationModel.aggregate([
    {
      $match: {
        job_Id: new ObjectId(jobId),
      },
    },
    {
      $facet: {
        statusCounts: [
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
            },
          },
        ],
        totalCount: [
          {
            $count: "totalApplications",
          },
        ],
      },
    },
  ]);

  const userIds = applications
    .filter((application) => application.user_Id)
    .map((application) => application.user_Id);

  const users = await UserModel.find({
    _id: { $in: userIds },
  })
    .select("resume username email createdAt")
    .lean();

  const applicants = users.map((user) => {
    const application = applications.find(
      (app) => app.user_Id.toString() === user._id.toString(),
    );

    return {
      ...user,
      applicationId: application?._id ?? null,
      status: application?.status ?? null,
    };
  });

  return {
    job,
    totalApplicants,
    page,
    limit,
    applicants,
  };
};

export const updateApplicationStatusService = async (
  applicationId: string,
  status: string,
) => {
  const application = await applicationModel.findByIdAndUpdate(
    applicationId,
    { status },
    { new: true },
  );

  if (!application) {
    throw new AppError("Application not found", STATUS_NOT_FOUND);
  }

  return application;
};
