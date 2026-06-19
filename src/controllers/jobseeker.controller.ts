import {
  STATUS_BAD_REQUEST,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
} from "../constants/status/http.status";
import JobSeekerDetailsModel from "../models/jobseeker_details.model";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  getJobseekerDetailsService,
  addEducationService,
  addSkillService,
  deleteSkillService,
  addLanguageService,
  deleteLanguageService,
} from "../services/jobseekerDetails.service";

type EducationField =
  | "X"
  | "XII"
  | "graduation"
  | "postgraduation"
  | "doctorate";

export const getJobseekerDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const details = await getJobseekerDetailsService(req.user!.id);

    return res.status(STATUS_OK).json({
      success: true,
      data: details,
    });
  },
);

export const addEducation = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      educationField,
      educationData,
    }: {
      educationField: EducationField;
      educationData: any;
    } = req.body;

    const updatedDetails = await addEducationService(
      req.user!.id,
      educationField,
      educationData,
    );

    return res.status(STATUS_OK).json({
      success: true,
      message: "Education updated successfully",
      data: {
        educationField,
        education: updatedDetails.education[educationField],
      },
    });
  },
);

export const addSkills = asyncHandler(async (req: Request, res: Response) => {
  const updatedDetails = await addSkillService(req.user!.id, req.body.skill);
  return res.status(STATUS_OK).json({
    success: true,
    message: "Skill added successfully",
    data: updatedDetails.skills,
  });
});

export const deleteSkill = asyncHandler(async (req: Request, res: Response) => {
  const { skill } = req.body;

  const skills = await deleteSkillService(req.user!.id, skill);

  return res.status(STATUS_OK).json({
    success: true,
    message: "Skill deleted successfully",
    data: skills,
  });
});

export const addLanguage = asyncHandler(async (req: Request, res: Response) => {
  const languages = await addLanguageService(req.user!.id, req.body.language);

  return res.status(STATUS_OK).json({
    success: true,
    message: "Language added successfully",
    data: languages,
  });
});

export const deleteLanguage = asyncHandler(
  async (req: Request, res: Response) => {
    const languages = await deleteLanguageService(
      req.user!.id,
      req.body.language,
    );

    return res.status(STATUS_OK).json({
      success: true,
      message: "Language deleted successfully",
      data: languages,
    });
  },
);

export const updateSummary = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const { summary } = req.body;

    if (!summary) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Summary is required" });
    }

    const jobSeekerDetails = await JobSeekerDetailsModel.findOne({
      User_id: id,
    });

    if (!jobSeekerDetails) {
      return res.status(STATUS_NOT_FOUND).json({ message: "User not found" });
    }
    jobSeekerDetails.summary = summary;

    await jobSeekerDetails.save();

    return res
      .status(STATUS_OK)
      .json({ message: "Summary Updated Successfully" });
  } catch (error) {
    return res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error", error: error });
  }
};

export const updatePreference = async (req: Request, res: Response) => {
  try {
    const id = req.params.user_Id;
    const { job_type, join_time, locations } = req.body;

    if (job_type && !Array.isArray(job_type)) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "job_type should be an array" });
    }

    if (
      job_type &&
      !job_type.every((item: string) => ["internship", "job"].includes(item))
    ) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Invalid job type" });
    }

    if (
      join_time &&
      ![
        "immediate",
        "15 days",
        "1 month",
        "2 months",
        "3 months",
        "more than 3 months",
      ].includes(join_time)
    ) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Invalid join time" });
    }

    if (locations && !Array.isArray(locations)) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "locations should be an array" });
    }

    if (
      locations &&
      !locations.every((item: string) =>
        [
          "mumbai",
          "pune",
          "delhi",
          "hyderabad",
          "chennai",
          "bangalore",
          "chandigarh",
          "kolkata",
          "gurgaon",
          "ahemdabad",
        ].includes(item),
      )
    ) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Invalid location" });
    }

    const user = await JobSeekerDetailsModel.findOne({ User_id: id });

    if (!user) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "User not found" });
    }

    if (!user.preference) {
      if (!user.preference) {
        user.preference = {
          job_type: [],
          join_time: "1 month",
          locations: [],
        };
      }
    }

    if (job_type) {
      user.preference.job_type = job_type;
    }
    if (join_time) {
      user.preference.join_time = join_time;
    }
    if (locations) {
      user.preference.locations = locations;
    }

    await user.save();

    return res
      .status(STATUS_OK)
      .json({ message: "Preference updated successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error });
  }
};

export const addExperience = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Unauthorized user" });
    }
    const experienceData = req.body;

    console.log(experienceData);
    const jobSeeker = await JobSeekerDetailsModel.findOne({
      User_id: user.id,
    });
    if (!jobSeeker) {
      return res
        .status(STATUS_NOT_FOUND)
        .json({ message: "Profile not found" });
    }
    jobSeeker.experience.push(experienceData);
    await jobSeeker.save();
    res.status(STATUS_OK).json({
      message: "Experience added successfully",
      data: jobSeeker.experience,
    });
  } catch (error) {
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Server error", error });
  }
};

export const updateExperience = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { expId } = req.params;
    const updatedData = req.body;

    const jobSeeker = await JobSeekerDetailsModel.findOne({
      User_id: user?.id,
    });
    if (!jobSeeker) {
      return res
        .status(STATUS_NOT_FOUND)
        .json({ message: "Profile not found" });
    }
    const experience = jobSeeker.experience.find(
      (exp: any) => exp._id.toString() === expId,
    );
    if (!experience) {
      return res
        .status(STATUS_NOT_FOUND)
        .json({ message: "Experience not found" });
    }

    Object.assign(experience, updatedData);

    await jobSeeker.save();

    res.status(STATUS_OK).json({
      message: "Experience updated successfully",
      data: jobSeeker.experience,
    });
  } catch (error) {
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Server error", error });
  }
};

export const deleteExperience = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { expId } = req.params;

    if (!user) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Unauthorized user" });
    }

    const jobSeeker = await JobSeekerDetailsModel.findOne({
      User_id: user.id,
    });

    if (!jobSeeker) {
      return res
        .status(STATUS_NOT_FOUND)
        .json({ message: "Profile not found" });
    }

    const initialLength = jobSeeker.experience.length;

    jobSeeker.experience = jobSeeker.experience.filter((exp: any) => {
      return exp._id.toString() !== String(expId);
    });

    if (jobSeeker.experience.length === initialLength) {
      return res
        .status(STATUS_NOT_FOUND)
        .json({ message: "Experience not found" });
    }

    jobSeeker.markModified("experience");

    await jobSeeker.save();

    res.status(STATUS_OK).json({
      message: "Experience deleted successfully",
    });
  } catch (error) {
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Server error", error });
  }
};
