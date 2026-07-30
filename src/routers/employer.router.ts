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
import { listEmployerJobs } from "../controllers/job.controller";

// API documentation for these routes lives in `src/docs/employer.docs.ts`
// and reuses schemas from `src/docs/schemas/employer.schema.ts`.

const router = Router();

router.get("/", getEmployersValidation, validateRequest, getAllEmployers);

// Public: jobs for a specific employer by ID
router.get("/:id/jobs", listEmployerJobs);

// _______________ Authenticated Employer Routes _________________

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

// Authenticated: jobs for the currently logged-in employer
router.get(
  "/jobs",
  authenticateToken,
  authorizeRoles("employer"),
  listEmployerJobs,
);

router.get("/:id", employerIdValidator, validateRequest, getEmployerById);

export default router;
