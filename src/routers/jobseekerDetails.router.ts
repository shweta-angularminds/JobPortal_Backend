import { Router } from "express";
import {
  addEducation,
  addLanguage,
  addSkills,
  deleteLanguage,
  getEducationDetails,
  getJobseekerDetails,
  getLanguages,
  updateEducationDetails,
  updatePreference,
  updateSkills,
  updateSummary,
} from "../controllers/jobseeker.controller";

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

export default router;
