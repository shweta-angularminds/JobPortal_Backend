import dotenv from "dotenv";
dotenv.config();

import { Router } from "express";
import authenticateToken, {
  authorizeRoles,
} from "../middleware/auth.middleware";

import {
  changePassword,
  employerProfile,
  getAllEmployers,
  getEmployerById,
  updateEmployerDetails,
} from "../controllers/employer.controller";
import uploadImage from "../middleware/uploadImage";
import {
  changePasswordValidator,
  employerIdValidator,
  getEmployersValidation,
  updateEmployerValidator,
} from "../validations/employer.validator";
import { validateRequest } from "../middleware/validation.middleware";
import { listJobsByEmployer } from "../controllers/job.controller";
import { getJobsByCompanyValidator } from "../validations/job.validator";

const router = Router();

router.get("/", getEmployersValidation, validateRequest, getAllEmployers);

router.get(
  "/profile",
  authenticateToken,
  authorizeRoles("employer"),
  employerProfile,
);
router.put(
  "/profile",
  authenticateToken,
  authorizeRoles("employer"),
  uploadImage("companyLogo"),
  updateEmployerValidator,
  validateRequest,
  updateEmployerDetails,
);
router.put(
  "/change-password",
  authenticateToken,
  authorizeRoles("employer"),
  changePasswordValidator,
  validateRequest,
  changePassword,
);

router.get("/:id", employerIdValidator, validateRequest, getEmployerById);

router.get(
  "/:employerId/jobs",
  
  getJobsByCompanyValidator,
  validateRequest,
  listJobsByEmployer,
);

export default router;
