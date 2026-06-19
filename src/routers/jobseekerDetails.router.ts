import { Router } from "express";
import {
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
import authenticateUserToken from "../middleware/userAuth.middleware";
import authenticateToken, {
  authorizeRoles,
} from "../middleware/auth.middleware";
import {
  addEducationValidator,
  addSkillValidator,
  languageValidator,
  SummaryValidator,
} from "../validations/jobseekerDetails.validator";
import { validateRequest } from "../middleware/validation.middleware";

const router = Router();

/* GET ALL DETAILS ROUTE */
router.get(
  "/details",
  authenticateToken,
  authorizeRoles("jobseeker"),
  getJobseekerDetails,
);

/* EDUCATION ROUTES */
router.post(
  "/education",
  authenticateToken,
  authorizeRoles("jobseeker"),
  addEducationValidator,
  validateRequest,
  addEducation,
);

/*  SKILLS ROUTES  */
router.post(
  "/skills",
  authenticateToken,
  authorizeRoles("jobseeker"),
  addSkillValidator,
  validateRequest,
  addSkills,
);

router.delete(
  "/skills",
  authenticateToken,
  authorizeRoles("jobseeker"),
  deleteSkill,
);

/*  LANGUAGES ROUTES */
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

//  SUMMARY ROUTES
router.patch(
  "/summary",
  authenticateToken,
  authorizeRoles("jobseeker"),
  SummaryValidator,
  validateRequest,
  updateSummary,
);

//  PREFERENCE ROUTES
router.patch("/:user_Id/preference", updatePreference);

//  EXPERIENCE ROUTES
router.post("/experience", authenticateUserToken, addExperience);
router.put("/experience/:expId", authenticateUserToken, updateExperience);
router.delete("/experience/:expId", authenticateUserToken, deleteExperience);

export default router;
