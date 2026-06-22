import { body } from "express-validator";
import {
  JOB_TYPES,
  JOIN_TIMES,
  LOCATIONS,
} from "../constants/jobseeker.constants";

export const addEducationValidator = [
  body("educationField")
    .notEmpty()
    .withMessage("Education field is required")
    .isIn(["X", "XII", "graduation", "postgraduation", "doctorate"])
    .withMessage("Invalid education field"),

  body("educationData").notEmpty().withMessage("Education data is required"),
];

export const addSkillValidator = [
  body("skill")
    .trim()
    .notEmpty()
    .withMessage("Skill is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Skill must be between 2 to 50 characters"),
];

export const languageValidator = [
  body("language")
    .trim()
    .notEmpty()
    .withMessage("Language is required")
    .isLength({ min: 2, max: 30 })
    .withMessage("Language must be between 2 and 30 characters"),
];

export const SummaryValidator = [
  body("summary")
    .trim()
    .notEmpty()
    .withMessage("Summary is required")
    .isLength({ min: 20, max: 1000 })
    .withMessage("Summary must be between 20 and 1000 characters"),
];

export const updatePreferenceValidator = [
  body("job_type")
    .optional()
    .isArray()
    .withMessage("job_type should be an array"),

  body("job_type.*").optional().isIn(JOB_TYPES).withMessage("Invalid job type"),

  body("join_time")
    .optional()
    .isIn(JOIN_TIMES)
    .withMessage("Invalid join time"),

  body("locations")
    .optional()
    .isArray()
    .withMessage("locations should be an array"),

  body("locations.*")
    .optional()
    .isIn(LOCATIONS)
    .withMessage("Invalid location"),
];

export const experienceValidator = [
  body("companyName").trim().notEmpty().withMessage("Company name is required"),

  body("jobTitle").trim().notEmpty().withMessage("Job title is required"),

  body("employmentType")
    .isIn(["Full-time", "Part-time", "Internship", "Contract"])
    .withMessage("Invalid employment type"),

  body("startDate").isISO8601().withMessage("Invalid start date"),

  body("endDate").optional().isISO8601().withMessage("Invalid end date"),

  body("isCurrentJob").optional().isBoolean(),

  body("technologiesUsed").optional().isArray(),

  body("achievements").optional().isArray(),
];