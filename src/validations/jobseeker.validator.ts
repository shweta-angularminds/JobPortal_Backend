import { body } from "express-validator";
import { AppError } from "../utils/appError";
import { STATUS_BAD_REQUEST } from "../constants/status/http.status";
import {
  JOB_TYPES,
  JOIN_TIMES,
  LOCATIONS,
} from "../constants/variables/jobseeker.constants";

export const updateProfileValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),

  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 2, max: 30 })
    .withMessage("Username must be between 2 and 30 characters")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage(
      "Username can contain only uppercase letters, lowercase letters, and spaces",
    ),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone cannot be empty")
    .isMobilePhone("en-IN")
    .withMessage("Invalid phone number"),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location cannot be empty")
    .isLength({ min: 2, max: 50 })
    .withMessage("Location must be between 2 and 50 characters")
    .matches(/^[A-Za-z0-9\s,.-]+$/)
    .withMessage(
      "Location can contain letters, numbers, spaces, commas, periods, and hyphens",
    ),

  body("gender")
    .isIn(["male", "female", "other"])
    .withMessage("Invalid gender"),

  body("fresher")
    .notEmpty()
    .withMessage("Fresher status is required")
    .isBoolean()
    .withMessage("Fresher must be true or false")
    .toBoolean(),

  body("bdate")
    .notEmpty()
    .withMessage("Birth date cannot be empty")
    .isISO8601()
    .withMessage("Invalid birth date")
    .toDate()
    .custom((value) => {
      const today = new Date();

      if (value > today) {
        throw new AppError(
          "Birth date cannot be in the future",
          STATUS_BAD_REQUEST,
        );
      }

      const age =
        today.getFullYear() -
        value.getFullYear() -
        (today.getMonth() < value.getMonth() ||
        (today.getMonth() === value.getMonth() &&
          today.getDate() < value.getDate())
          ? 1
          : 0);

      if (age < 16) {
        throw new AppError("Age must be at least 16 years", STATUS_BAD_REQUEST);
      }

      return true;
    }),
];

export const addEducationValidator = [
  body("educationField")
    .notEmpty()
    .withMessage("Education field is required")
    .isIn(["X", "XII", "graduation", "postgraduation", "doctorate"])
    .withMessage("Invalid education field"),

  body("educationData").notEmpty().withMessage("Education data is required"),
];

export const skillValidator = [
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
