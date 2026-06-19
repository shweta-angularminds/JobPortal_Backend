import { body } from "express-validator";

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