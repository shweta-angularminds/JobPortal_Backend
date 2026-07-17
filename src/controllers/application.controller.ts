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
import UserModel from "../models/jobseeker.model";
import { asyncHandler } from "../utils/asyncHandler";
import {
  applyJobService,
  checkJobAppliedService,
  getAllApplicationService,
  getApplicationDetailsService,
  getApplicationsCountService,
  getJobApplicationsService,
  updateApplicationStatusService,
} from "../services/application.service";
import { matchedData } from "express-validator";

// ________________________FOR JOBSEEKER __________________________________

export const applyForJob = asyncHandler(async (req: Request, res: Response) => {
  const { job_Id } = req.body;

  await applyJobService(job_Id, req.user!.id);

  return res.status(STATUS_CREATED).json({ message: "Applied Successfully!" });
});

export const hasAppliedToJob = asyncHandler(
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

export const getMyApplications = asyncHandler(
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

// _________________________ FOR EMPLOYER ______________________________________

export const getApplicationDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  const application = await getApplicationDetailsService(id);

  res.status(STATUS_OK).json(application);
};

export const getApplicationsCount = async (req: Request, res: Response) => {
  const { jobIds } = matchedData(req);

  const result = await getApplicationsCountService(jobIds);

  return res.status(STATUS_OK).json(result);
};

export const getJobApplications = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      page = 1,
      limit = 10,
      status,
    } = matchedData(req, {
      locations: ["query"],
    });
    const { id } = req.params;
    const result = await getJobApplicationsService({
      jobId: id,
      page: Number(page),
      limit: Number(limit),
      status,
    });

    return res.status(STATUS_OK).json(result);
  },
);

export const updateApplicationStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { applicationId } = req.params;
    const { status } = req.body;

    await updateApplicationStatusService(applicationId, status);

    return res.status(STATUS_OK).json({
      message: "Status updated successfully!",
    });
  },
);
