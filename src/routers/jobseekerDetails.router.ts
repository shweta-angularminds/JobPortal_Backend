import { Router } from "express";
import {
  addEducation,
  addExperience,
  addLanguage,
  addSkills,
  deleteExperience,
  deleteLanguage,
  getEducationDetails,
  getJobseekerDetails,
  getLanguages,
  updateEducationDetails,
  updateExperience,
  updatePreference,
  updateSkills,
  updateSummary,
} from "../controllers/jobseeker.controller";
import authenticateUserToken from "../middleware/userAuth.middleware";

const router = Router();

/* GET ALL DETAILS ROUTE */
router.get("/:user_id/details", getJobseekerDetails);

// EDUCATION ROUTES
router.post("/:user_id/education", addEducation);
router.get("/fetch/:user_id/education", getEducationDetails);
router.put("/:user_id/education", updateEducationDetails);

//  SKILLS ROUTES
router.post("/:userId/skills", addSkills);
router.put("/:userId/skills", updateSkills);

//  LANGUAGES ROUTES
router.post("/:userId/language", addLanguage);
router.get("/:userId/language", getLanguages);
router.put("/:userId/language", deleteLanguage);

//  SUMMARY ROUTES
router.patch("/:userId/summary", updateSummary);

//  PREFERENCE ROUTES
router.patch("/:user_Id/preference", updatePreference);

//  EXPERIENCE ROUTES
router.post("/experience",authenticateUserToken,addExperience)
router.put("/experience/:expId", authenticateUserToken, updateExperience);
router.delete("/experience/:expId", authenticateUserToken, deleteExperience);

export default router;
