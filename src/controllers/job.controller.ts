import { Request, Response } from "express";

import {
  STATUS_CREATED,
  STATUS_NOT_FOUND,
  STATUS_OK,
} from "../constants/status/http.status";

import {
  createJobService,
  deleteJobService,
  getCandidateDetailsService,
  getJobByIdService,
  listEmployerJobsService,
  listJobsByEmployerService,
  listJobsService,
  updateJobService,
} from "../services/job.service";

import { AppError } from "../utils/appError";
import { asyncHandler } from "../utils/asyncHandler";

// __________________ PUBLIC API _____________________________

export const listJobs = async (req: Request, res: Response) => {
  const {
    search = "",
    location = "",
    experience = "",
    employementType = "",
    page = "1",
    limit = "10",
  } = req.query;

  const result = await listJobsService({
    search: search as string,
    location: location as string,
    experience: experience as string,
    employementType: employementType as string,
    page: Number(page),
    limit: Number(limit),
  });

  return res.status(STATUS_OK).json({
    data: result.jobs,
    total: result.total,
    page: result.page,
    totalPages: result.totalPages,
  });
};

export const getJobById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const job = await getJobByIdService(id);

  if (!job) {
    throw new AppError("Job not found!", STATUS_NOT_FOUND);
  }

  return res.status(STATUS_OK).json(job);
});

export const listJobsByEmployer = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("welcome")
    const { employerId } = req.params;
    const { experience, department } = req.query;

    const limit = Number(req.query.limit) || 5;

    const jobs = await listJobsByEmployerService({
      employerId,
      experience: experience as string | undefined,
      department: department as string | undefined,
      limit,
    });

    return res.status(STATUS_OK).json(jobs);
  },
);

// _________________________ EMPLOYER RELATED API'S _________________

export const listEmployerJobs = asyncHandler(
  async (req: Request, res: Response) => {
    const { jobs, summary } = await listEmployerJobsService(req.user?.id!);

    return res.status(STATUS_OK).json({ data: { jobs, summary } });
  },
);

export const createJob = asyncHandler(async (req: Request, res: Response) => {
  const job = await createJobService({
    ...req.body,
    employer_id: req.user?.id!,
  });

  return res.status(STATUS_CREATED).json({
    message: "Job created successfully!",
    job,
  });
});

export const updateJob = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const updatedJob = await updateJobService({
    id,
    employer_id: req.user?.id!,
    ...req.body,
  });

  if (!updatedJob) {
    throw new AppError("Job not found!", STATUS_NOT_FOUND);
  }

  return res.status(STATUS_OK).json({
    message: "Job updated successfully",
    job: updatedJob,
  });
});

export const deleteJob = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedJob = await deleteJobService(id);

  if (!deletedJob) {
    throw new AppError("Job not found!", STATUS_NOT_FOUND);
  }

  return res.status(STATUS_OK).json({
    message: "Job deleted successfully!",
  });
});

export const getCandidateDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const { jobId, candidateId } = req.params;

    const candidate = await getCandidateDetailsService({
      employerId: req.user!.id,
      jobId,
      candidateId,
    });

    return res.status(STATUS_OK).json({ data: candidate });
  },
);
