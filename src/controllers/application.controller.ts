import {
  STATUS_BAD_REQUEST,
  STATUS_CREATED,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
} from "../constants/status/http.status";
import { applicationModel } from "../models/application.model";
import { Request, Response } from "express";
import { jobModel } from "../models/job.model";
import { employerModel } from "../models/employer.model";
import { ObjectId } from "mongodb";
import UserModel from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import {
  applyJobService,
  checkJobAppliedService,
  getAllApplicationService,
} from "../services/application.service";

export const applyJob = asyncHandler(async (req: Request, res: Response) => {
  const { job_Id } = req.body;

  await applyJobService(job_Id, req.user!.id);

  return res.status(STATUS_CREATED).json({ message: "Applied Successfully!" });
});

export const viewAllAppliedJobsOfUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { page = "1", limit = "10", search = "", status } = req.query;

    const applications = await getAllApplicationService({
      userId: req.user!.id,
      page: Number(page),
      limit: Number(limit),
      search: search.toString(),
      status: status?.toString(),
    });

    res.status(STATUS_OK).json(applications);
  },
);

export const checkJobApplied = asyncHandler(
  async (req: Request, res: Response) => {
    const isApplied = await checkJobAppliedService(
      req.user!.id,
      req.params.jobId,
    );

    res.status(STATUS_OK).json({
      isApplied,
    });
  },
);


export const getSingleJobInfo = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(STATUS_BAD_REQUEST)
      .json({ message: "Application Id is required!" });
  }

  try {
    const application = await applicationModel
      .findById(id)
      .select("job_Id createdAt updatedAt");

    if (!application) {
      return res.status(STATUS_OK).json({ message: "No Application Found!" });
    }

    const job = await jobModel
      .findById(application.job_Id)
      .select("designation employer_id");

    if (!job) {
      return res.status(STATUS_OK).json({ message: "No Job Found!" });
    }

    const employer = await employerModel
      .findById(job.employer_id)
      .select("companyName");

    if (!employer) {
      return res.status(STATUS_OK).json({ message: "No Employer Found!" });
    }

    const result = {
      application_id: application._id,
      designation: job.designation,
      job_id: application.job_Id,
      createdAt: application.createdAt,
      updatedAt: application.updatedAt,
      company_name: employer.companyName,
    };

    return res.status(STATUS_OK).json(result);
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error", error: error });
  }
};

export const getApplicationsCount = async (req: Request, res: Response) => {
  const jobIds = req.body.jobIds;

  if (!jobIds) {
    return res
      .status(STATUS_BAD_REQUEST)
      .json({ message: "Job IDs must be provided" });
  }

  const jobIdsArray = Array.isArray(jobIds) ? jobIds : [jobIds];

  try {
    const objectIds = jobIdsArray.map((id: string) => new ObjectId(id));

    const result = await applicationModel.aggregate([
      {
        $match: {
          job_Id: { $in: objectIds },
        },
      },
      {
        $group: {
          _id: "$job_Id",
          applicantsCount: { $sum: 1 },
          shortlistedCount: {
            $sum: {
              $cond: [{ $eq: ["$status", "shortlisted"] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          job_Id: "$_id",
          applicantsCount: 1,
          shortlistedCount: 1,
          _id: 0,
        },
      },
    ]);

    const totalApplicantsCount = result.reduce(
      (sum, current) => sum + current.applicantsCount,
      0,
    );
    const totalShortlistedCount = result.reduce(
      (sum, current) => sum + current.shortlistedCount,
      0,
    );
    return res.status(STATUS_OK).json({
      result: result,
      total: totalApplicantsCount,
      shortlisted: totalShortlistedCount,
    });
  } catch (error) {
    return res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Server error", error: error });
  }
};

export const seeApplications = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { page = 1, limit = 10, status } = req.query;

  if (!id) {
    return res
      .status(STATUS_BAD_REQUEST)
      .json({ message: "Job Id is required!" });
  }
  const job_name = await jobModel.findById(id).select("designation");
  try {
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    if (pageNumber < 1 || limitNumber < 1) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Invalid pagination parameters!" });
    }

    const skip = (pageNumber - 1) * limitNumber;
    const statusFilter = status ? { status: status } : {};

    const applications = await applicationModel
      .find({ job_Id: id, ...statusFilter })
      .skip(skip)
      .limit(limitNumber)
      .exec();

    if (!applications || applications.length === 0) {
      return res.status(STATUS_OK).send({
        totalApplicants: 0,
        page: pageNumber,
        limit: limitNumber,
        applicants: [],
      });
    }

    const totalApplicants = await applicationModel.aggregate([
      {
        $match: {
          job_Id: new ObjectId(id),
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
      .filter((application) => application.user_Id != null)
      .map((application) => application.user_Id);

    const applicants = await UserModel.find({
      _id: { $in: userIds },
    })
      .select("resume username email createdAt")
      .lean()
      .exec();

    const applicantsWithStatus = applicants.map((user) => {
      const userApplication = applications.find(
        (application) => application.user_Id.toString() === user._id.toString(),
      );

      return {
        ...user,
        applicationId: userApplication ? userApplication._id : null,
        status: userApplication ? userApplication.status : null,
      };
    });

    return res.status(STATUS_OK).send({
      Job: job_name,
      totalApplicants,
      page: pageNumber,
      limit: limitNumber,
      applicants: applicantsWithStatus,
    });
  } catch (error) {
    return res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error", error: error });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  const { status, application_Id } = req.body;

  if (!status && !application_Id) {
    return res
      .status(STATUS_BAD_REQUEST)
      .json({ message: "Status and application ID both are required!" });
  }

  const validStatuses = ["approved", "rejected", "pending", "shortlisted"];

  if (!validStatuses.includes(status)) {
    return res.status(STATUS_BAD_REQUEST).json({
      message: `Invalid status. Valid statuses are: ${validStatuses.join(
        ", ",
      )}`,
    });
  }

  try {
    const updateApplication = await applicationModel.findByIdAndUpdate(
      application_Id,
      { status },
      { new: true },
    );

    if (!updateApplication) {
      return res
        .status(STATUS_NOT_FOUND)
        .json({ message: "Application not found" });
    }

    return res
      .status(STATUS_OK)
      .json({ message: "Status updated succesfully!" });
  } catch (error) {
    return res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error });
  }
};
