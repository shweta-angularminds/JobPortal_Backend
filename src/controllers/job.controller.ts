import {
  STATUS_BAD_REQUEST,
  STATUS_CREATED,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "../constants/status/http.status";
import { jobModel } from "../models/job.model";
import { Request, Response } from "express";
import JobSeekerDetailsModel from "../models/jobseeker_details.model";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

export const getJobByCompany = async (req: Request, res: Response) => {
  try {
    const employerId = req.params.id;
    const { experience, department, limit } = req.query;
    const query: any = { employer_id: employerId };

    if (experience) {
      query.experience = experience;
    }

    if (department) {
      query.department = department;
    }

    const limitValue = limit ? parseInt(limit as string) : 5;

    if (isNaN(limitValue)) {
      return res
        .status(STATUS_BAD_REQUEST)
        .send({ message: "Invalid limit value" });
    }

    const jobs = await jobModel.find(query).select("-__v").limit(limitValue);

    if (!jobs || jobs.length === 0) {
      return res
        .status(STATUS_NOT_FOUND)
        .send({ message: "Not Found Any Job" });
    }

    return res.status(STATUS_OK).send(jobs);
  } catch (error) {
    return res.status(STATUS_INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

export const getJobDetails = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Job Id is required!" });
    }

    const job = await jobModel.findById(id);

    if (!job) {
      return res.status(STATUS_NOT_FOUND).json({ message: "Job not found!" });
    }

    return res.status(STATUS_OK).send(job);
  } catch (error) {
    return res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error", error: error });
  }
};

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user || !user.id) {
      return res
        .status(STATUS_UNAUTHORIZED)
        .send({ message: "User is not Authenticated!" });
    }

    const employerId = user.id;
    const Jobs = await jobModel.find({ employer_id: employerId });

    if (!Jobs) {
      return res
        .status(STATUS_NOT_FOUND)
        .send({ message: "Not Found Any Job" });
    }

    return res.status(STATUS_OK).send(Jobs);
  } catch (error) {
    return res.status(STATUS_INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error found",
      error: error,
    });
  }
};

export const createNewJob = async (req: Request, res: Response) => {
  const {
    designation,
    location,
    experience,
    positions,
    workType,
    salary,
    qualifications,
    skills,
    employementType,
    industry,
    department,
    desc,
  } = req.body;
  const user = req.user;

  if (!user || !user.id) {
    return res.status(STATUS_UNAUTHORIZED).send("User not authenticated.");
  }

  const employer_id = user.id;
  if (
    !designation ||
    !location ||
    !experience ||
    !positions ||
    !workType ||
    !salary ||
    !qualifications ||
    !skills ||
    !employementType ||
    !industry ||
    !department ||
    !desc
  ) {
    return res
      .status(STATUS_BAD_REQUEST)
      .json({ message: "All fields are required!" });
  }

  if (!employer_id) {
    return res
      .status(STATUS_BAD_REQUEST)
      .json({ message: "Employer ID is required!" });
  }

  try {
    const newJob = new jobModel({
      designation,
      location,
      experience,
      positions,
      workType,
      salary,
      qualifications,
      skills,
      employementType,
      industry,
      department,
      desc,

      employer_id,
    });

    await newJob.save();

    return res
      .status(STATUS_CREATED)
      .json({ message: "Job Created succesfully!" });
  } catch (error) {
    return res.status(STATUS_INTERNAL_SERVER_ERROR).json({
      message: "Unknown error Occured!",
      error: error,
    });
  }
};

export const updateJobDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Job Id is required!" });
    }

    const {
      designation,
      location,
      experience,
      positions,
      workType,
      salary,
      qualifications,
      skills,
      employementType,
      industry,
      department,
      desc,
    } = req.body;
    const user = req.user;

    if (!user || !user.id) {
      return res.status(STATUS_UNAUTHORIZED).send("User not authenticated.");
    }

    const employer_id = user.id;

    if (
      !designation ||
      !location ||
      !experience ||
      !positions ||
      !workType ||
      !salary ||
      !qualifications ||
      !skills ||
      !employementType ||
      !industry ||
      !department ||
      !desc
    ) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "All fields are required!" });
    }

    if (!employer_id) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Employer ID is required!" });
    }

    const updatedJob = await jobModel.findByIdAndUpdate(
      id,
      {
        designation,
        location,
        experience,
        positions,
        workType,
        salary,
        qualifications,
        skills,
        employementType,
        industry,
        department,
        desc,
        employer_id,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedJob) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "Job not found!" });
    }

    return res
      .status(STATUS_OK)
      .json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    return res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Job Id is required!" });
    }

    const deletedJob = await jobModel.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(STATUS_NOT_FOUND).json({ message: "Job not found! " });
    }

    return res.status(STATUS_OK).json({
      message: "Job Deleted Successfully!",
    });
  } catch (error) {
    return res
      .send(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error", error: error });
  }
};

export const applicantsDetails = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res
      .status(STATUS_BAD_REQUEST)
      .json({ message: "Candidate Id is required" });
  }

  try {
    const candidate = await JobSeekerDetailsModel.aggregate([
      {
        $match: {
          User_id: new ObjectId(id),
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

    return res.status(STATUS_OK).send({ candidate: candidate });
  } catch (error) {
    return res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error });
  }
};
