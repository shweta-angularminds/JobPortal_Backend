/**
 * @openapi
 * /skillset/auth/employer/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Employer login
 *     description: Authenticate an employer using email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Invalid credentials
 *
 * /skillset/auth/employer/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new employer
 *     description: Register a new employer with company details and company logo (JPG, JPEG, PNG; max 5 MB).
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/EmployerRegisterInput'
 *     responses:
 *       201:
 *         description: Employer registered successfully.
 *       400:
 *         description: Validation error or invalid company logo.
 *       409:
 *         description: Employer already exists.
 *
 * /skillset/auth/jobseeker/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Job seeker login
 *     description: Authenticate a job seeker using email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 *
 * /skillset/auth/jobseeker/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new job seeker
 *     description: Register a new job seeker with resume upload.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/JobSeekerRegisterInput'
 *     responses:
 *       201:
 *         description: Job seeker registered successfully.
 *       400:
 *         description: Validation error.
 *       409:
 *         description: Email already exists.
 */

export {};
