import { Router } from "express";

import {
  applyForJob,
  getApplicationDetails,
  
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
  getApplicationsValidation,
  updateApplicationStatusValidator,
} from "../validations/application.validator";
import { validateRequest } from "../middleware/validation.middleware";

const router = Router();

// __________________ JobSeeker _____________________
/**
 * @openapi
 * /skillset/application:
 *   post:
 *     tags:
 *       - Application
 *     summary: Apply for a job
 *     description: Allows an authenticated job seeker to apply for a job.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - job_Id
 *             properties:
 *               job_Id:
 *                 type: string
 *                 description: Job MongoDB ID
 *                 example: 64f1b2c3d4e5f67890123456
 *     responses:
 *       201:
 *         description: Job application submitted successfully.
 *       400:
 *         description: Invalid request or job ID.
 *       401:
 *         description: Unauthorized. Invalid or missing access token.
 *       403:
 *         description: Forbidden. Only job seekers can access this endpoint.
 *       404:
 *         description: Job not found.
 *       409:
 *         description: Job has already been applied for.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/",
  authenticateToken,
  authorizeRoles("jobseeker"),
  applyJobValidation,
  validateRequest,
  applyForJob,
);

/**
 * @openapi
 * /skillset/application/my:
 *   get:
 *     tags:
 *       - Application
 *     summary: Get my applications
 *     description: Retrieves a paginated list of applications submitted by the authenticated job seeker with optional search and status filters.
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *         description: Number of applications per page.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *       - in: query
 *         name: search
 *         required: false
 *         description: Search applications by job title, company, or other searchable fields.
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         required: false
 *         description: Filter applications by status.
 *         schema:
 *           type: string
 *           enum:
 *             - pending
 *             - approved
 *             - rejected
 *             - shortlisted
 *     responses:
 *       200:
 *         description: Applications retrieved successfully.
 *       400:
 *         description: Invalid query parameters.
 *       401:
 *         description: Unauthorized. Invalid or missing access token.
 *       403:
 *         description: Forbidden. Only job seekers can access this endpoint.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/my",
  authenticateToken,
  authorizeRoles("jobseeker"),
  getApplicationsValidation,
  validateRequest,
  getMyApplications,
);

/**
 * @openapi
 * /skillset/application/job/{jobId}/check:
 *   get:
 *     tags:
 *       - Application
 *     summary: Check if the authenticated job seeker has applied to a job
 *     description: Returns whether the authenticated job seeker has already applied for the specified job.
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
 *     responses:
 *       200:
 *         description: Application status retrieved successfully.
 *       400:
 *         description: Invalid job ID.
 *       401:
 *         description: Unauthorized. Invalid or missing access token.
 *       403:
 *         description: Forbidden. Only job seekers can access this endpoint.
 *       404:
 *         description: Job not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/job/:jobId/check",
  authenticateToken,
  authorizeRoles("jobseeker"),
  appliedJobIdValidation,
  validateRequest,
  hasAppliedToJob,
);

//_______________________Employer _________________________

/**
 * @openapi
 * /skillset/application/{id}:
 *   get:
 *     tags:
 *       - Application
 *     summary: Employer - Get application details
 *     description: Retrieves the details of a specific job application. Accessible only by the authenticated employer.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Application MongoDB ID
 *         schema:
 *           type: string
 *           example: 64f1b2c3d4e5f67890123456
 *     responses:
 *       200:
 *         description: Application details retrieved successfully.
 *       400:
 *         description: Invalid application ID.
 *       401:
 *         description: Unauthorized. Invalid or missing access token.
 *       403:
 *         description: Forbidden. Only employers can access this endpoint.
 *       404:
 *         description: Application not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/:id",
  authenticateToken,
  authorizeRoles("employer"),
  applicationIdValidator,
  validateRequest,
  getApplicationDetails,
);


/**
 * @openapi
 * /skillset/application/see-applications/{id}:
 *   get:
 *     tags:
 *       - Application
 *     summary: Employer - Get applications for a job
 *     description: Retrieves a paginated list of applications for a specific job with optional search and status filters. Accessible only by the authenticated employer.
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
 *         description: Number of applications per page.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *       - in: query
 *         name: search
 *         required: false
 *         description: Search applications by candidate name or other searchable fields.
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         required: false
 *         description: Filter applications by status.
 *         schema:
 *           type: string
 *           enum:
 *             - pending
 *             - approved
 *             - rejected
 *             - shortlisted
 *     responses:
 *       200:
 *         description: Applications retrieved successfully.
 *       400:
 *         description: Invalid job ID or query parameters.
 *       401:
 *         description: Unauthorized. Invalid or missing access token.
 *       403:
 *         description: Forbidden. Only employers can access this endpoint.
 *       404:
 *         description: Job not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/see-applications/:id",
  authenticateToken,
  authorizeRoles("employer"),
  getApplicationsValidation,
  validateRequest,
  getJobApplications,
);

/**
 * @openapi
 * /skillset/application/{applicationId}/status:
 *   put:
 *     tags:
 *       - Application
 *     summary: Employer - Update application status
 *     description: Updates the status of a job application. Accessible only by the authenticated employer.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: applicationId
 *         required: true
 *         description: Application MongoDB ID
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
 *               - application_Id
 *               - status
 *             properties:
 *               application_Id:
 *                 type: string
 *                 description: Application MongoDB ID
 *                 example: 64f1b2c3d4e5f67890123456
 *               status:
 *                 type: string
 *                 description: New status of the application.
 *                 enum:
 *                   - approved
 *                   - rejected
 *                   - pending
 *                   - shortlisted
 *                 example: shortlisted
 *     responses:
 *       200:
 *         description: Application status updated successfully.
 *       400:
 *         description: Invalid application ID or status.
 *       401:
 *         description: Unauthorized. Invalid or missing access token.
 *       403:
 *         description: Forbidden. Only employers can access this endpoint.
 *       404:
 *         description: Application not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/:applicationId/status",
  authenticateToken,
  authorizeRoles("employer"),
  updateApplicationStatusValidator,
  validateRequest,
  updateApplicationStatus,
);

export default router;
