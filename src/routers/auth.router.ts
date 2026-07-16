import { Router } from "express";

import {
  employerLogin,
  employerRegister,
  jobseekerLogin,
  jobseekerRegister,
} from "../controllers/auth.controller";
import uploadImage from "../middleware/uploadImage";
import uploadResume from "../middleware/uploadResume";
import {
  jobSeekerRegisterValidator,
  loginValidation,
  registerEmployerValidator,
} from "../validations/auth.validator";
import { validateRequest } from "../middleware/validation.middleware";
import { validateResume } from "../validations/resume.validator";
import { validateCompanyLogo } from "../validations/profilePicture.validator";

const router = Router();

/**
 * @openapi
 * /skillset/auth/employer/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Employer login
 *     description: Authenticate an employer using email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: employer@example.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Invalid credentials
 */

router.post("/employer/login", loginValidation, validateRequest, employerLogin);

/**
 * @openapi
 * /skillset/auth/employer/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new employer
 *     description: Register a new employer with company details and company logo (JPG, JPEG, PNG; max 5 MB).
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - employer_name
 *               - email
 *               - companyName
 *               - contactNumber
 *               - address
 *               - website
 *               - password
 *               - companyLogo
 *             properties:
 *               employer_name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: hr@skillsetworks.com
 *               companyName:
 *                 type: string
 *                 example: SkillsetWorks
 *               contactNumber:
 *                 type: string
 *                 example: "9876543210"
 *               address:
 *                 type: string
 *                 example: Pune, Maharashtra, India
 *               website:
 *                 type: string
 *                 format: uri
 *                 example: https://www.skillsetworks.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: Password@123
 *               companyLogo:
 *                 type: string
 *                 format: binary
 *                 description: Company logo (JPG, JPEG, PNG, max 5 MB)
 *     responses:
 *       201:
 *         description: Employer registered successfully.
 *       400:
 *         description: Validation error or invalid company logo.
 *       409:
 *         description: Employer already exists.
 */
router.post(
  "/employer/register",
  uploadImage("companyLogo"),
  validateCompanyLogo,
  registerEmployerValidator,
  validateRequest,
  employerRegister,
);

/**
 * @openapi
 * /skillset/auth/jobseeker/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Job seeker login
 *     description: Authenticate a job seeker using email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 */
router.post(
  "/jobseeker/login",
  loginValidation,
  validateRequest,
  jobseekerLogin,
);

/**
 * @openapi
 * /skillset/auth/jobseeker/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new job seeker
 *     description: Register a new job seeker with resume upload.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - phone
 *               - email
 *               - password
 *               - fresher
 *               - resume
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 30
 *                 example: Shweta Patil
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: shweta@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 maxLength: 20
 *                 example: Password@123
 *               fresher:
 *                 type: boolean
 *                 example: true
 *               resume:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Job seeker registered successfully.
 *       400:
 *         description: Validation error.
 *       409:
 *         description: Email already exists.
 */
router.post(
  "/jobseeker/register",
  uploadResume,
  validateResume,
  jobSeekerRegisterValidator,
  validateRequest,
  jobseekerRegister,
);

export default router;
