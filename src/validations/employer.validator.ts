import { body, param, query } from "express-validator";

export const getEmployersValidation = [
  query("page").optional().isInt({ min: 1 }).toInt(),

  query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),

  query("search").optional().trim(),
];

export const updateEmployerValidator = [
  body("employer_name")
    .trim()
    .notEmpty()
    .withMessage("Employer name is required"),

  body("email").trim().isEmail().withMessage("Invalid email"),

  body("companyName").trim().notEmpty().withMessage("Company name is required"),

  body("contactNumber")
    .trim()
    .notEmpty()
    .withMessage("Contact number is required"),

  body("address").trim().notEmpty().withMessage("Address is required"),

  body("website").trim().isURL().withMessage("Invalid website url"),
];

export const changePasswordValidator = [
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Current password is required"),

  body("newPassword")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 8 characters"),

  body("newPassword")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter"),

  body("newPassword")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter"),

  body("newPassword")
    .matches(/[0-9]/)
    .withMessage("Password must contain a number"),

  body("newPassword")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain a special character"),
];

export const employerIdValidator = [
  param("id").isMongoId().withMessage("Invalid employer id"),
];
