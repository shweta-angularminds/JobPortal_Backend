import { Router } from "express";
import {
  deleteProfilePicture,
  getProfile,
  updateProfile,
  updateProfilePicture,
  updateResume,
  addEducation,
  addExperience,
  addLanguage,
  addSkills,
  deleteExperience,
  deleteLanguage,
  deleteSkill,
  getJobseekerDetails,
  updateExperience,
  updatePreference,
  updateSummary,
} from "../controllers/jobseeker.controller";
import authenticateToken, {
  authorizeRoles,
} from "../middleware/auth.middleware";

import { validateRequest } from "../middleware/validation.middleware";
import {
  addEducationValidator,
  skillValidator,
  experienceValidator,
  languageValidator,
  SummaryValidator,
  updatePreferenceValidator,
  updateProfileValidator,
} from "../validations/jobseeker.validator";
import uploadImage from "../middleware/uploadImage";
import { validateProfilePicture } from "../validations/profilePicture.validator";
import uploadResume from "../middleware/uploadResume";
import { validateResume } from "../validations/resume.validator";

// API documentation for these routes lives in `src/docs/jobseeker.docs.ts`
// and reuses schemas from `src/docs/schemas/jobseeker.schema.ts`.

const router = Router();

router.get(
  "/profile",
  authenticateToken,
  authorizeRoles("jobseeker"),
  getProfile,
);

router.patch(
  "/profile",
  authenticateToken,
  authorizeRoles("jobseeker"),
  updateProfileValidator,
  validateRequest,
  updateProfile,
);

router.patch(
  "/profile/image",
  authenticateToken,
  authorizeRoles("jobseeker"),
  uploadImage("profilePic"),
  validateProfilePicture,
  updateProfilePicture,
);

router.delete(
  "/profile/image",
  authenticateToken,
  authorizeRoles("jobseeker"),
  deleteProfilePicture,
);

router.patch(
  "/profile/resume",
  authenticateToken,
  authorizeRoles("jobseeker"),
  uploadResume,
  validateResume,
  updateResume,
);

router.get(
  "/details",
  authenticateToken,
  authorizeRoles("jobseeker"),
  getJobseekerDetails,
);

router.post(
  "/education",
  authenticateToken,
  authorizeRoles("jobseeker"),
  addEducationValidator,
  validateRequest,
  addEducation,
);

router.post(
  "/skills",
  authenticateToken,
  authorizeRoles("jobseeker"),
  skillValidator,
  validateRequest,
  addSkills,
);

router.delete(
  "/skills",
  authenticateToken,
  authorizeRoles("jobseeker"),
  skillValidator,
  validateRequest,
  deleteSkill,
);

router.post(
  "/language",
  authenticateToken,
  authorizeRoles("jobseeker"),
  languageValidator,
  validateRequest,
  addLanguage,
);

router.delete(
  "/language",
  authenticateToken,
  authorizeRoles("jobseeker"),
  languageValidator,
  validateRequest,
  deleteLanguage,
);

router.patch(
  "/summary",
  authenticateToken,
  authorizeRoles("jobseeker"),
  SummaryValidator,
  validateRequest,
  updateSummary,
);

router.patch(
  "/preference",
  authenticateToken,
  authorizeRoles("jobseeker"),
  updatePreferenceValidator,
  validateRequest,
  updatePreference,
);

router.post(
  "/experience",
  authenticateToken,
  authorizeRoles("jobseeker"),
  experienceValidator,
  validateRequest,
  addExperience,
);

router.put(
  "/experience/:expId",
  authenticateToken,
  authorizeRoles("jobseeker"),
  experienceValidator,
  validateRequest,
  updateExperience,
);

router.delete(
  "/experience/:expId",
  authenticateToken,
  authorizeRoles("jobseeker"),
  deleteExperience,
);

export default router;
