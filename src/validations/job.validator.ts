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
  param("id").notEmpty().withMessage("Job Id is required"),
];
export const getJobsValidation = [
  query("page").optional().isNumeric(),
  query("limit").optional().isNumeric(),
];