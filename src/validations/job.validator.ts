import { body, param, query } from "express-validator";

export const createJobValidation = [
  body("designation").notEmpty().withMessage("Designation is required"),
  body("location").notEmpty().withMessage("Location is required"),
  body("experience").notEmpty().withMessage("Experience is required"),
  body("positions").notEmpty().withMessage("Positions is required"),
  body("workType").notEmpty().withMessage("Work Type is required"),
  body("salary").notEmpty().withMessage("Salary is required"),
  body("qualifications").notEmpty().withMessage("Qualifications is required"),
  body("skills").notEmpty().withMessage("Skills is required"),
  body("employementType").notEmpty().withMessage("Employment Type is required"),
  body("industry").notEmpty().withMessage("Industry is required"),
  body("department").notEmpty().withMessage("Department is required"),
  body("desc").notEmpty().withMessage("Description is required"),
];

export const updateJobValidation = [
  param("id").notEmpty().withMessage("Job Id is required"),

  body("designation").notEmpty(),
  body("location").notEmpty(),
  body("experience").notEmpty(),
  body("positions").notEmpty(),
  body("workType").notEmpty(),
  body("salary").notEmpty(),
  body("qualifications").notEmpty(),
  body("skills").notEmpty(),
  body("employementType").notEmpty(),
  body("industry").notEmpty(),
  body("department").notEmpty(),
  body("desc").notEmpty(),
];

export const jobIdValidation = [
  param("id").notEmpty().isMongoId().withMessage("Valid Job Id is required"),
];

export const getJobsValidation = [
  query("page").optional().isNumeric(),
  query("limit").optional().isNumeric(),
];

export const getJobsByCompanyValidator = [
  param("employerId").isMongoId().withMessage("Invalid employer id"),

  query("experience")
    .optional()
    .isString()
    .withMessage("Experience must be a string"),

  query("department")
    .optional()
    .isString()
    .withMessage("Department must be a string"),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
];

export const getJobsValidator = [
  query("search").optional().isString().withMessage("Search must be a string"),

  query("location")
    .optional()
    .isString()
    .withMessage("Location must be a string"),

  query("experience")
    .optional()
    .isString()
    .withMessage("Experience must be a string"),

  query("employementType")
    .optional()
    .isString()
    .withMessage("Employment type must be a string"),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
];

export const createJobValidator = [
  body("designation").trim().notEmpty().withMessage("Designation is required"),

  body("location").trim().notEmpty().withMessage("Location is required"),

  body("experience").trim().notEmpty().withMessage("Experience is required"),

  body("positions").isNumeric().withMessage("Positions is required"),

  body("workType").trim().notEmpty().withMessage("Work type is required"),

  body("salary").isNumeric().withMessage("Salary is required"),

  body("qualifications")
    .trim()
    .notEmpty()
    .withMessage("Qualifications are required"),

  body("skills").notEmpty().withMessage("Skills are required"),

  body("employementType")
    .trim()
    .notEmpty()
    .withMessage("Employment type is required"),

  body("industry").trim().notEmpty().withMessage("Industry is required"),

  body("department").trim().notEmpty().withMessage("Department is required"),

  body("desc").trim().notEmpty().withMessage("Description is required"),
];

export const updateJobValidator = [...jobIdValidation, ...createJobValidator];

export const candidateDetailsValidation = [
  param("jobId").isMongoId().withMessage("Invalid Job Id"),

  param("candidateId").isMongoId().withMessage("Invalid Candidate Id"),
];
