import { body, param, query } from "express-validator";

export const getApplicationsValidation = [
  query("page").optional().isInt({ min: 1 }).toInt(),

  query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),

  query("search").optional().trim(),

  query("status")
    .optional()
    .isIn(["pending", "approved", "rejected", "shortlisted"]),
];

export const applyJobValidation = [
  body("job_Id")
    .notEmpty()
    .withMessage("Job Id is required")
    .isMongoId()
    .withMessage("Invalid Job Id"),
];

export const applicationIdValidator = [
  param("id").isMongoId().withMessage("Valid application id is required"),
];

export const appliedJobIdValidation = [
  param("jobId").isMongoId().withMessage("Invalid Job Id"),
];

export const getApplicationsCountValidator = [
  body("jobIds").isArray({ min: 1 }).withMessage("Job IDs must be provided"),
  body("jobIds.*")
    .isMongoId()
    .withMessage("Each job ID must be a valid Mongo ID"),
];

export const updateApplicationStatusValidator = [
  body("application_Id")
    .isMongoId()
    .withMessage("Valid application ID is required"),

  body("status")
    .isIn(["approved", "rejected", "pending", "shortlisted"])
    .withMessage(
      "Status must be one of: approved, rejected, pending, shortlisted",
    ),
];