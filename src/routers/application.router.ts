import { Router } from "express";

import {
  applyForJob,
  getApplicationDetails,
  getApplicationsCount,
  getJobApplications,
  getMyApplications,
  hasAppliedToJob,
  updateApplicationStatus,
} from "../controllers/application.controller";
import authenticateToken, {
  authorizeRoles,
} from "../middleware/auth.middleware";
import {
  applicationIdValidator,
  appliedJobIdValidation,
  applyJobValidation,
  getApplicationsCountValidator,
  getApplicationsValidation,
  updateApplicationStatusValidator,
} from "../validations/application.validator";
import { validateRequest } from "../middleware/validation.middleware";

const router = Router();

// __________________ JobSeeker _____________________

router.post(
  "/",
  authenticateToken,
  authorizeRoles("jobseeker"),
  applyJobValidation,
  validateRequest,
  applyForJob,
);

router.get(
  "/my",
  authenticateToken,
  authorizeRoles("jobseeker"),
  getApplicationsValidation,
  validateRequest,
  getMyApplications,
);

router.get(
  "/job/:jobId/check",
  authenticateToken,
  authorizeRoles("jobseeker"),
  appliedJobIdValidation,
  validateRequest,
  hasAppliedToJob,
);

//_______________________Employer _________________________

router.get(
  "/:id",
  authenticateToken,
  authorizeRoles("employer"),
  applicationIdValidator,
  validateRequest,
  getApplicationDetails,
);

router.post(
  "/count",
  authenticateToken,
  authorizeRoles("employer"),
  getApplicationsCountValidator,
  validateRequest,
  getApplicationsCount,
);

router.get(
  "/see-applications/:id",
  authenticateToken,
  authorizeRoles("employer"),
  getApplicationsValidation,
  validateRequest,
  getJobApplications,
);

router.put(
  "/:applicationId/status",
  authenticateToken,
  authorizeRoles("employer"),
  updateApplicationStatusValidator,
  validateRequest,
  updateApplicationStatus,
);

export default router;
