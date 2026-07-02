import { body, query } from "express-validator";

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

  body("user_Id")
    .notEmpty()
    .withMessage("User Id is required")
    .isMongoId()
    .withMessage("Invalid User Id"),
];
