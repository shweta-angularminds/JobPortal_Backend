/**
 * @openapi
 * /skillset/employers:
 *   get:
 *     tags:
 *       - Employer
 *     summary: Get all employers
 *     description: Returns a paginated list of employers with optional search.
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Page number
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         description: Number of records per page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *       - in: query
 *         name: search
 *         description: Search employers by company name or other searchable fields
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employers retrieved successfully.
 *       400:
 *         description: Invalid query parameters.
 *       500:
 *         description: Internal server error.
 *
 * /skillset/employers/profile:
 *   get:
 *     tags:
 *       - Employer
 *     summary: Get employer profile
 *     description: Retrieves the authenticated employer's profile.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Employer profile retrieved successfully.
 *       401:
 *         description: Unauthorized. Invalid or missing access token.
 *       403:
 *         description: Forbidden. Only employers can access this endpoint.
 *       500:
 *         description: Internal server error.
 *   put:
 *     tags:
 *       - Employer
 *     summary: Update employer profile
 *     description: Updates the authenticated employer's profile, including an optional company logo.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/EmployerProfileUpdateInput'
 *     responses:
 *       200:
 *         description: Employer profile updated successfully.
 *       400:
 *         description: Validation failed or invalid image.
 *       401:
 *         description: Unauthorized. Invalid or missing access token.
 *       403:
 *         description: Forbidden. Only employers can access this endpoint.
 *       500:
 *         description: Internal server error.
 *
 * /skillset/employers/change-password:
 *   put:
 *     tags:
 *       - Employer
 *     summary: Change employer password
 *     description: Changes the password of the authenticated employer.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordInput'
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *       400:
 *         description: Validation failed or current password is incorrect.
 *       401:
 *         description: Unauthorized. Invalid or missing access token.
 *       403:
 *         description: Forbidden. Only employers can access this endpoint.
 *       500:
 *         description: Internal server error.
 *
 * /skillset/employers/jobs:
 *   get:
 *     tags:
 *       - Employer
 *     summary: Get jobs posted by the authenticated employer
 *     description: Retrieves all jobs posted by the currently authenticated employer, with optional filters.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: experience
 *         required: false
 *         description: Filter jobs by experience level.
 *         schema:
 *           type: string
 *           example: 2-4 Years
 *       - in: query
 *         name: department
 *         required: false
 *         description: Filter jobs by department.
 *         schema:
 *           type: string
 *           example: Engineering
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Maximum number of jobs to return.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 10
 *     responses:
 *       200:
 *         description: Jobs retrieved successfully.
 *       401:
 *         description: Unauthorized. Invalid or missing access token.
 *       403:
 *         description: Forbidden. Only employers can access this endpoint.
 *       500:
 *         description: Internal server error.
 *
 * /skillset/employers/{id}:
 *   get:
 *     tags:
 *       - Employer
 *     summary: Get employer by ID
 *     description: Retrieves the details of an employer by its MongoDB ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employer MongoDB ID
 *         schema:
 *           type: string
 *           example: 64f1b2c3d4e5f67890123456
 *     responses:
 *       200:
 *         description: Employer retrieved successfully.
 *       400:
 *         description: Invalid employer ID.
 *       404:
 *         description: Employer not found.
 *       500:
 *         description: Internal server error.
 *
 * /skillset/employers/{id}/jobs:
 *   get:
 *     tags:
 *       - Employer
 *     summary: Get jobs by employer
 *     description: Retrieves all jobs posted by a specific employer with optional filters. Public endpoint (no authentication required).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employer MongoDB ID
 *         schema:
 *           type: string
 *           example: 64f1b2c3d4e5f67890123456
 *       - in: query
 *         name: experience
 *         required: false
 *         description: Filter jobs by experience level.
 *         schema:
 *           type: string
 *           example: 2-4 Years
 *       - in: query
 *         name: department
 *         required: false
 *         description: Filter jobs by department.
 *         schema:
 *           type: string
 *           example: Engineering
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Maximum number of jobs to return.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 10
 *     responses:
 *       200:
 *         description: Jobs retrieved successfully.
 *       400:
 *         description: Invalid employer ID or query parameters.
 *       404:
 *         description: Employer not found.
 *       500:
 *         description: Internal server error.
 */

export {};
