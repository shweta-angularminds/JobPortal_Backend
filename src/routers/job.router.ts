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

/**
 * @openapi
 * /skillset/jobs:
 *   get:
 *     tags:
 *       - Job
 *     summary: Get all jobs
 *     description: Retrieves a paginated list of jobs with optional search and filtering.
 *     parameters:
 *       - in: query
 *         name: search
 *         required: false
 *         description: Search jobs by title, company, or keywords.
 *         schema:
 *           type: string
 *           example: Software Engineer
 *       - in: query
 *         name: location
 *         required: false
 *         description: Filter jobs by location.
 *         schema:
 *           type: string
 *           example: Pune
 *       - in: query
 *         name: experience
 *         required: false
 *         description: Filter jobs by required experience.
 *         schema:
 *           type: string
 *           example: 2-4 Years
 *       - in: query
 *         name: employementType
 *         required: false
 *         description: Filter jobs by employment type.
 *         schema:
 *           type: string
 *           example: Full Time
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of jobs per page.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *     responses:
 *       200:
 *         description: Jobs retrieved successfully.
 *       400:
 *         description: Invalid query parameters.
 *       500:
 *         description: Internal server error.
 */
router.get("/", getJobsValidator, validateRequest, listJobs);

/**
 * @openapi
 * /skillset/jobs/{id}:
 *   get:
 *     tags:
 *       - Job
 *     summary: Get job by ID
 *     description: Retrieves the details of a specific job by its MongoDB ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Job MongoDB ID
 *         schema:
 *           type: string
 *           example: 64f1b2c3d4e5f67890123456
 *     responses:
 *       200:
 *         description: Job retrieved successfully.
 *       400:
 *         description: Invalid job ID.
 *       404:
 *         description: Job not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", jobIdValidation, validateRequest, getJobById);

// BELOW ROUTES ARE FOR EMPLOYERS TO PERFORM CRUD ON JOBS

/**
 * @openapi
 * /skillset/jobs/employer:
 *   get:
 *     tags:
 *       - Job
 *     summary: Get jobs posted by the authenticated employer
 *     description: Retrieves all jobs created by the currently authenticated employer.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Employer jobs retrieved successfully.
 *       401:
 *         description: Unauthorized. Invalid or missing access token.
 *       403:
 *         description: Forbidden. Only employers can access this endpoint.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/jobs/employer",
  authenticateToken,
  authorizeRoles("employer"),
  listEmployerJobs,
);

/**
 * @openapi
 * /skillset/jobs:
 *   post:
 *     tags:
 *       - Job
 *     summary: Create a new job
 *     description: Creates a new job posting for the authenticated employer.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - designation
 *               - location
 *               - experience
 *               - positions
 *               - workType
 *               - salary
 *               - qualifications
 *               - skills
 *               - employementType
 *               - industry
 *               - department
 *               - desc
 *             properties:
 *               designation:
 *                 type: string
 *                 example: Software Engineer
 *               location:
 *                 type: string
 *                 example: Pune
 *               experience:
 *                 type: string
 *                 example: 2-4 Years
 *               positions:
 *                 type: integer
 *                 example: 5
 *               workType:
 *                 type: string
 *                 example: Hybrid
 *               salary:
 *                 type: number
 *                 example: 800000
 *               qualifications:
 *                 type: string
 *                 example: B.E./B.Tech in Computer Science
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - Node.js
 *                   - Express
 *                   - MongoDB
 *               employementType:
 *                 type: string
 *                 example: Full Time
 *               industry:
 *                 type: string
 *                 example: Information Technology
 *               department:
 *                 type: string
 *                 example: Engineering
 *               desc:
 *                 type: string
 *                 example: We are looking for an experienced Software Engineer...
 *     responses:
 *       201:
 *         description: Job created successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized. Invalid or missing access token.
 *       403:
 *         description: Forbidden. Only employers can access this endpoint.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/",
  authenticateToken,
  authorizeRoles("employer"),
  createJobValidator,
  validateRequest,
  createJob,
);

/**
 * @openapi
 * /skillset/jobs/{id}:
 *   put:
 *     tags:
 *       - Job
 *     summary: Update a job
 *     description: Updates an existing job posted by the authenticated employer.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Job MongoDB ID
 *         schema:
 *           type: string
 *           example: 64f1b2c3d4e5f67890123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - designation
 *               - location
 *               - experience
 *               - positions
 *               - workType
 *               - salary
 *               - qualifications
 *               - skills
 *               - employementType
 *               - industry
 *               - department
 *               - desc
 *             properties:
 *               designation:
 *                 type: string
 *                 example: Software Engineer
 *               location:
 *                 type: string
 *                 example: Pune
 *               experience:
 *                 type: string
 *                 example: 2-4 Years
 *               positions:
 *                 type: integer
 *                 example: 5
 *               workType:
 *                 type: string
 *                 example: Hybrid
 *               salary:
 *                 type: number
 *                 example: 800000
 *               qualifications:
 *                 type: string
 *                 example: B.E./B.Tech in Computer Science
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - Node.js
 *                   - Express
 *                   - MongoDB
 *               employementType:
 *                 type: string
 *                 example: Full Time
 *               industry:
 *                 type: string
 *                 example: Information Technology
 *               department:
 *                 type: string
 *                 example: Engineering
 *               desc:
 *                 type: string
 *                 example: Updated job description...
 *     responses:
 *       200:
 *         description: Job updated successfully.
 *       400:
 *         description: Invalid job ID or validation failed.
 *       401:
 *         description: Unauthorized. Invalid or missing access token.
 *       403:
 *         description: Forbidden. Only employers can access this endpoint.
 *       404:
 *         description: Job not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("employer"),
  updateJobValidator,
  validateRequest,
  updateJob,
);

/**
 * @openapi
 * /skillset/jobs/{id}:
 *   delete:
 *     tags:
 *       - Job
 *     summary: Delete a job
 *     description: Deletes a job posted by the authenticated employer.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Job MongoDB ID
 *         schema:
 *           type: string
 *           example: 64f1b2c3d4e5f67890123456
 *     responses:
 *       200:
 *         description: Job deleted successfully.
 *       400:
 *         description: Invalid job ID.
 *       401:
 *         description: Unauthorized. Invalid or missing access token.
 *       403:
 *         description: Forbidden. Only employers can access this endpoint.
 *       404:
 *         description: Job not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("employer"),
  jobIdValidation,
  validateRequest,
  deleteJob,
);

/**
 * @openapi
 * /skillset/jobs/{jobId}/candidates/{candidateId}:
 *   get:
 *     tags:
 *       - Job
 *     summary: Get candidate details
 *     description: Retrieves the details of a candidate who applied for a specific job. Accessible only by the authenticated employer.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: Job MongoDB ID
 *         schema:
 *           type: string
 *           example: 64f1b2c3d4e5f67890123456
 *       - in: path
 *         name: candidateId
 *         required: true
 *         description: Candidate MongoDB ID
 *         schema:
 *           type: string
 *           example: 64f1b2c3d4e5f67890123457
 *     responses:
 *       200:
 *         description: Candidate details retrieved successfully.
 *       400:
 *         description: Invalid job ID or candidate ID.
 *       401:
 *         description: Unauthorized. Invalid or missing access token.
 *       403:
 *         description: Forbidden. Only employers can access this endpoint.
 *       404:
 *         description: Job or candidate not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/:jobId/candidates/:candidateId",
  authenticateToken,
  authorizeRoles("employer"),
  candidateDetailsValidation,
  validateRequest,
  getCandidateDetails,
);

export default router;
