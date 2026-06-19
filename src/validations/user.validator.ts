import { body } from "express-validator";
import { AppError } from "../utils/appError";
import { STATUS_BAD_REQUEST } from "../constants/status/http.status";

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
