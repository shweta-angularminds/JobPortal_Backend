import dotenv from "dotenv";
dotenv.config();

import { Router } from "express";

import {
  employerLogin,
  employerRegister,
  jobseekerLogin,
  jobseekerRegister,
} from "../controllers/auth.controller";
import uploadImage from "../middleware/uploadImage";
import uploadResume from "../middleware/uploadResume";

const router = Router();

router.post("/employer/login", employerLogin);
router.post("/employer/register", uploadImage("companyLogo"), employerRegister);


router.post(
  "/jobseeker/register",
  (req, res, next) => {
    uploadResume(req, res, function (err: any) {
      if (err) {
        console.error("Upload error:", err);

        return res.status(400).json({
          success: false,
          message: err.message || "File upload failed",
        });
      }
      next();
    });
  },
  jobseekerRegister,
);


router.post("/jobseeker/login", jobseekerLogin);

export default router;
