import { Router } from "express";

import {
  employerLogin,
  employerRegister,
  jobseekerLogin,
  jobseekerRegister,
} from "../controllers/auth.controller";
import uploadImage from "../middleware/uploadImage";
import uploadResume from "../middleware/uploadResume";
import { jobSeekerRegisterValidator, loginValidation } from "../validations/auth.validator";
import { validateRequest } from "../middleware/validation.middleware";
import { validateResume } from "../validations/resume.validator";

const router = Router();

router.post("/employer/login", employerLogin);
router.post("/employer/register", uploadImage("companyLogo"), employerRegister);


router.post(
  "/jobseeker/register",
  uploadResume,
  validateResume,
  jobSeekerRegisterValidator,
  validateRequest,
  jobseekerRegister,
);


router.post(
  "/jobseeker/login",
  loginValidation,
  validateRequest,
  jobseekerLogin,
);

export default router;
