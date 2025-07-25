import dotenv from "dotenv";
dotenv.config();

import { Router } from "express";
import upload from "../middleware/multer.middleware";
import uploadFile from "../middleware/file.multer";
import {
  employerLogin,
  employerRegister,
  jobseekerLogin,
  jobseekerRegister,
} from "../controllers/auth.controller";

const router = Router();

router.post("/employer/login", employerLogin);
router.post("/employer/register", upload("companyLogo"), employerRegister);

router.post("/jobseeker/register", uploadFile, jobseekerRegister);

router.post("/jobseeker/login", jobseekerLogin);

export default router;
