import { Router } from "express";
import authenticateToken, {
  authorizeRoles,
} from "../middleware/auth.middleware";
import {
  createJob,
  deleteJob,
  getCandidateDetails,
  getJobById,
  listEmployerJobs,
  listJobs,
  updateJob,
} from "../controllers/job.controller";
import {
  candidateDetailsValidation,
  createJobValidator,
  getJobsValidator,
  jobIdValidation,
  updateJobValidator,
} from "../validations/job.validator";
import { validateRequest } from "../middleware/validation.middleware";

const router = Router();

router.get("/", getJobsValidator, validateRequest, listJobs);

router.get("/:id", jobIdValidation, validateRequest, getJobById);

// BELOW ROUTES ARE FOR EMPLOYERS TO PERFORM CRUD ON JOBS

router.get(
  "/jobs/employer",
  authenticateToken,
  authorizeRoles("employer"),
  listEmployerJobs,
);

router.post(
  "/",
  authenticateToken,
  authorizeRoles("employer"),
  createJobValidator,
  validateRequest,
  createJob,
);

router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("employer"),
  updateJobValidator,
  validateRequest,
  updateJob,
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("employer"),
  jobIdValidation,
  validateRequest,
  deleteJob,
);

router.get(
  "/:jobId/candidates/:candidateId",
  authenticateToken,
  authorizeRoles("employer"),
  candidateDetailsValidation,
  validateRequest,
  getCandidateDetails,
);

export default router;
