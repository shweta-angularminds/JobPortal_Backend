import {
  STATUS_BAD_REQUEST,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
} from "../constants/status/http.status";
import JobSeekerDetailsModel from "../models/jobseeker_details.model";
import { Request, Response } from "express";

type EducationField =
  | "X"
  | "XII"
  | "graduation"
  | "postgraduation"
  | "doctorate";

export const getJobseekerDetails = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id;
    const data = await JobSeekerDetailsModel.find({ User_id: user_id });

    if (!data) {
      return res.status(STATUS_OK).send([]);
    }

    return res.status(STATUS_OK).send(data);
  } catch (error) {
    return res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error });
  }
};

export const addEducation = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id;
    const {
      educationField,
      educationData,
    }: { educationField: EducationField; educationData: any } = req.body;

    if (!educationField || !educationData) {
      return res
        .status(400)
        .json({ message: "educationField and educationData are required" });
    }

    const existingJobSeeker = await JobSeekerDetailsModel.findOne({
      User_id: user_id,
    });

    if (existingJobSeeker) {
      if (!existingJobSeeker.education) {
        existingJobSeeker.education = {};
      }

      existingJobSeeker.education[educationField] = educationData;

      await existingJobSeeker.save();

      return res.status(200).json({
        message: "Job Seeker education updated successfully",
        data: existingJobSeeker,
      });
    } else {
      const newJobSeekerDetails = new JobSeekerDetailsModel({
        User_id: user_id,
        education: {
          [educationField]: educationData,
        },
      });

      const savedJobSeekerDetails = await newJobSeekerDetails.save();

      return res.status(201).json({
        message: "Job Seeker details created successfully",
        data: savedJobSeekerDetails,
      });
    }
  } catch (error) {
    // console.error("Error in creating or updating job seeker details:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getEducationDetails = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id;
    const existingJobSeeker = await JobSeekerDetailsModel.findOne({
      User_id: user_id,
    });

    if (!existingJobSeeker) {
      return res.status(404).json({ message: "User not found", result: [] });
    }

    return res.status(200).send(existingJobSeeker);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

export const updateEducationDetails = async (req: Request, res: Response) => {
  try {
    const id = req.params.user_id;
    const {
      educationField,
      educationData,
    }: { educationField: EducationField; educationData: any } = req.body;

    if (!educationField || !educationData) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "educationField and educationData are required" });
    }

    const existingJobSeeker = await JobSeekerDetailsModel.findOne({
      User_id: id,
    });

    if (!existingJobSeeker) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "User not found", result: [] });
    }

    if (
      existingJobSeeker.education &&
      educationField in existingJobSeeker.education
    ) {
      existingJobSeeker.education[educationField] = educationData;
    } else {
      return res.status(STATUS_BAD_REQUEST).json({
        message: `${educationField} education field not found`,
        data: existingJobSeeker.education,
      });
    }

    await existingJobSeeker.save();

    return res.status(STATUS_OK).json({ message: "Updated Successfully!" });
  } catch (error) {
    return res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error", error: error });
  }
};

export const addSkills = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { skill } = req.body;

  if (!skill) {
    return res
      .status(STATUS_BAD_REQUEST)
      .json({ message: "skill is required" });
  }

  try {
    const user = await JobSeekerDetailsModel.findOne({ User_id: userId });

    if (!user) {
      return res.status(STATUS_NOT_FOUND).json({ message: "User not found" });
    }

    if (user.skills.includes(skill)) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Skill already exists in the user's skills" });
    }

    user.skills.push(skill);

    await user.save();

    res.status(STATUS_OK).json({
      message: "Skill added successfully",
      skills: user.skills,
    });
  } catch (error) {
    // console.error("Error adding skill:", error);
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error });
  }
};

export const updateSkills = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const { skill } = req.body;
    const data = await JobSeekerDetailsModel.updateOne(
      { User_id: id },
      { $pull: { skills: skill } }
    );

    if (!data) {
      return res
        .status(STATUS_NOT_FOUND)
        .json({ message: "Not Found User", data: data });
    }

    return res.status(STATUS_OK).json({ message: "Deleted succesfully!" });
  } catch (error) {
    return res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error", error: error });
  }
};

export const addLanguage = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { language } = req.body;

  if (!language) {
    return res
      .status(STATUS_BAD_REQUEST)
      .json({ message: "Language is required" });
  }

  try {
    const user = await JobSeekerDetailsModel.findOne({ User_id: userId });

    if (!user) {
      return res.status(STATUS_NOT_FOUND).json({ message: "User not found" });
    }

    if (user.languages.includes(language)) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Language already exists in the user's languages" });
    }

    user.languages.push(language);

    await user.save();

    res.status(STATUS_OK).json({
      message: "Language added successfully",
      languages: user.languages,
    });
  } catch (error) {
    //console.error("Error adding language:", error);
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error });
  }
};

export const getLanguages = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const data = await JobSeekerDetailsModel.find({ User_id: id }).select(
      "languages"
    );
    return res.status(STATUS_OK).send(data);
  } catch (error) {
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error", error: error });
  }
};

export const deleteLanguage = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const { language } = req.body;
    const data = await JobSeekerDetailsModel.updateOne(
      { User_id: id },
      { $pull: { languages: language } }
    );

    if (!data) {
      return res
        .status(STATUS_NOT_FOUND)
        .json({ message: "Not Found User", data: data });
    }

    return res.status(STATUS_OK).json({ message: "Deleted succesfully!" });
  } catch (error) {
    return res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error", error: error });
  }
};

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
        ].includes(item)
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
