import { Request, Response } from "express";

import { EducationField } from "../constants/variables/jobseeker.constants";
import { STATUS_CREATED, STATUS_OK } from "../constants/status/http.status";

import {
  addEducationService,
  addExperienceService,
  addLanguageService,
  addSkillService,
  deleteExperienceService,
  deleteLanguageService,
  deleteProfilePictureService,
  deleteSkillService,
  getJobseekerDetailsService,
  getProfileService,
  updateExperienceService,
  updatePreferenceService,
  updateProfilePictureService,
  updateProfileService,
  updateResumeService,
  updateSummaryService,
} from "../services/jobseeker.service";

import { asyncHandler } from "../utils/asyncHandler";

// ____________________________________ JOBSEEKER PROFILE _________________________________

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await getProfileService(req.user!.id);

  return res.status(STATUS_OK).json({
    success: true,
    data: user,
  });
});

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const updatedUser = await updateProfileService(userId, req.body);

    return res.status(STATUS_OK).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  },
);

export const updateProfilePicture = asyncHandler(
  async (req: Request, res: Response) => {
    const updatedUser = await updateProfilePictureService(
      req.user!.id,
      req.file!.path,
    );
    return res.status(STATUS_OK).json({
      success: true,
      message: "Profile picture updated successfully",
      data: updatedUser,
    });
  },
);

export const deleteProfilePicture = asyncHandler(
  async (req: Request, res: Response) => {
    const updatedUser = await deleteProfilePictureService(req.user!.id);

    return res.status(STATUS_OK).json({
      success: true,
      message: "Profile picture deleted successfully",
      data: updatedUser,
    });
  },
);

export const updateResume = asyncHandler(
  async (req: Request, res: Response) => {
    const updatedUser = await updateResumeService(req.user!.id, req.file!.path);
    return res.status(STATUS_OK).json({
      success: true,
      message: "Resume updated successfully",
      data: updatedUser,
    });
  },
);

// ____________________________________ JOBSEEKER DETAILS __________________________________

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

export const updateSummary = asyncHandler(
  async (req: Request, res: Response) => {
    const { summary } = req.body;

    const updatedSummary = await updateSummaryService(req.user!.id, summary);

    return res.status(STATUS_OK).json({
      success: true,
      message: "Summary updated successfully",
      data: {
        summary: updatedSummary,
      },
    });
  },
);

export const updatePreference = asyncHandler(
  async (req: Request, res: Response) => {
    const updatedPreference = await updatePreferenceService(
      req.user!.id,
      req.body,
    );

    return res.status(STATUS_OK).json({
      success: true,
      message: "Preference updated successfully",
      data: updatedPreference,
    });
  },
);

export const addExperience = asyncHandler(
  async (req: Request, res: Response) => {
    const experience = await addExperienceService(req.user!.id, req.body);

    return res.status(STATUS_CREATED).json({
      success: true,
      message: "Experience added successfully",
      data: experience,
    });
  },
);

export const updateExperience = asyncHandler(
  async (req: Request, res: Response) => {
    const updatedExperience = await updateExperienceService(
      req.user!.id,
      req.params.expId,
      req.body,
    );

    return res.status(STATUS_OK).json({
      success: true,
      message: "Experience updated successfully",
      data: updatedExperience,
    });
  },
);

export const deleteExperience = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteExperienceService(req.user!.id, req.params.expId);

    return res.status(STATUS_OK).json({
      success: true,
      message: "Experience deleted successfully",
    });
  },
);
