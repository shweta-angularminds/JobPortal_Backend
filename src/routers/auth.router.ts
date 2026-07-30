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

// API documentation for these routes lives in `src/docs/auth.docs.ts`
// and reuses schemas from `src/docs/schemas/auth.schema.ts`.

const router = Router();

router.post("/employer/login", loginValidation, validateRequest, employerLogin);

router.post(
  "/employer/register",
  uploadImage("companyLogo"),
  validateCompanyLogo,
  registerEmployerValidator,
  validateRequest,
  employerRegister,
);

router.post(
  "/jobseeker/login",
  loginValidation,
  validateRequest,
  jobseekerLogin,
);

router.post(
  "/jobseeker/register",
  uploadResume,
  validateResume,
  jobSeekerRegisterValidator,
  validateRequest,
  jobseekerRegister,
);

export default router;
