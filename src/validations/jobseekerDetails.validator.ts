import { body } from "express-validator";

export const addEducationValidator = [
  body("educationField")
    .notEmpty()
    .withMessage("Education field is required")
    .isIn(["X", "XII", "graduation", "postgraduation", "doctorate"])
    .withMessage("Invalid education field"),

  body("educationData").notEmpty().withMessage("Education data is required"),
];
