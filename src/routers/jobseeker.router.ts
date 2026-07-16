import { Router } from "express";
import {
  deleteProfilePicture,
  getProfile,
  updateProfile,
  updateProfilePicture,
  updateResume,
  addEducation,
  addExperience,
  addLanguage,
  addSkills,
  deleteExperience,
  deleteLanguage,
  deleteSkill,
  getJobseekerDetails,
  updateExperience,
  updatePreference,
  updateSummary,
} from "../controllers/jobseeker.controller";
import authenticateToken, {
  authorizeRoles,
} from "../middleware/auth.middleware";

import { validateRequest } from "../middleware/validation.middleware";
import {
  addEducationValidator,
  skillValidator,
  experienceValidator,
  languageValidator,
  SummaryValidator,
  updatePreferenceValidator,
  updateProfileValidator,
} from "../validations/jobseeker.validator";
import uploadImage from "../middleware/uploadImage";
import { validateProfilePicture } from "../validations/profilePicture.validator";
import uploadResume from "../middleware/uploadResume";
import { validateResume } from "../validations/resume.validator";

const router = Router();

/**
 * @openapi
 * /skillset/jobseeker/profile:
 *   get:
 *     tags:
 *       - Job Seeker
 *     summary: Get logged-in job seeker profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully.
 *       401:
 *         description: Unauthorized.
 */
router.get(
  "/profile",
  authenticateToken,
  authorizeRoles("jobseeker"),
  getProfile,
);

/**
 * @openapi
 * /skillset/jobseeker/profile:
 *   patch:
 *     tags:
 *       - Job Seeker
 *     summary: Update job seeker profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - phone
 *               - location
 *               - gender
 *               - fresher
 *               - bdate
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               username:
 *                 type: string
 *                 example: John Doe
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               location:
 *                 type: string
 *                 example: Pune, Maharashtra
 *               gender:
 *                 type: string
 *                 enum:
 *                   - male
 *                   - female
 *                   - other
 *                 example: male
 *               fresher:
 *                 type: boolean
 *                 example: false
 *               bdate:
 *                 type: string
 *                 format: date
 *                 example: "2000-08-15"
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 */
router.patch(
  "/profile",
  authenticateToken,
  authorizeRoles("jobseeker"),
  updateProfileValidator,
  validateRequest,
  updateProfile,
);

/**
 * @openapi
 * /skillset/jobseeker/profile/image:
 *   patch:
 *     tags:
 *       - Job Seeker
 *     summary: Update profile picture
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePic:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture updated successfully.
 */
router.patch(
  "/profile/image",
  authenticateToken,
  authorizeRoles("jobseeker"),
  uploadImage("profilePic"),
  validateProfilePicture,
  updateProfilePicture,
);

/**
 * @openapi
 * /skillset/jobseeker/profile/image:
 *   delete:
 *     tags:
 *       - Job Seeker
 *     summary: Delete profile picture
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile picture deleted successfully.
 */
router.delete(
  "/profile/image",
  authenticateToken,
  authorizeRoles("jobseeker"),
  deleteProfilePicture,
);

/**
 * @openapi
 * /skillset/jobseeker/profile/resume:
 *   patch:
 *     tags:
 *       - Job Seeker
 *     summary: Upload or update resume
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               resume:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Resume updated successfully.
 */
router.patch(
  "/profile/resume",
  authenticateToken,
  authorizeRoles("jobseeker"),
  uploadResume,
  validateResume,
  updateResume,
);

/**
 * @openapi
 * /skillset/jobseeker/details:
 *   get:
 *     tags:
 *       - Job Seeker
 *     summary: Get complete job seeker details
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Details retrieved successfully.
 */
router.get(
  "/details",
  authenticateToken,
  authorizeRoles("jobseeker"),
  getJobseekerDetails,
);

/**
 * @openapi
 * /skillset/jobseeker/education:
 *   post:
 *     tags:
 *       - Job Seeker
 *     summary: Add education
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - educationField
 *               - educationData
 *             properties:
 *               educationField:
 *                 type: string
 *                 enum:
 *                   - X
 *                   - XII
 *                   - graduation
 *                   - postgraduation
 *                   - doctorate
 *                 example: graduation
 *               educationData:
 *                 oneOf:
 *                   - type: object
 *                     description: School Education (X/XII)
 *                     properties:
 *                       board_name:
 *                         type: string
 *                         example: Maharashtra State Board
 *                       passing_year:
 *                         type: string
 *                         example: "2020"
 *                       medium:
 *                         type: string
 *                         example: English
 *                       percentage:
 *                         type: string
 *                         example: "89.5"
 *                   - type: object
 *                     description: Higher Education (Graduation/Postgraduation/Doctorate)
 *                     properties:
 *                       course_name:
 *                         type: string
 *                         example: MCA
 *                       college_name:
 *                         type: string
 *                         example: ABC College
 *                       university:
 *                         type: string
 *                         example: Savitribai Phule Pune University
 *                       percentage:
 *                         type: string
 *                         example: "82.4"
 *                       cgpa:
 *                         type: string
 *                         example: "8.75"
 *                       start_year:
 *                         type: string
 *                         example: "2022"
 *                       end_year:
 *                         type: string
 *                         example: "2024"
 *     responses:
 *       201:
 *         description: Education added successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 */
router.post(
  "/education",
  authenticateToken,
  authorizeRoles("jobseeker"),
  addEducationValidator,
  validateRequest,
  addEducation,
);

/**
 * @openapi
 * /skillset/jobseeker/skills:
 *   post:
 *     tags:
 *       - Job Seeker
 *     summary: Add skill
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - skill
 *             properties:
 *               skill:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 example: Angular
 *     responses:
 *       201:
 *         description: Skill added successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 */
router.post(
  "/skills",
  authenticateToken,
  authorizeRoles("jobseeker"),
  skillValidator,
  validateRequest,
  addSkills,
);

/**
 * @openapi
 * /skillset/jobseeker/skills:
 *   delete:
 *     tags:
 *       - Job Seeker
 *     summary: Delete skill
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - skill
 *             properties:
 *               skill:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 example: Angular
 *     responses:
 *       200:
 *         description: Skill deleted successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 */
router.delete(
  "/skills",
  authenticateToken,
  authorizeRoles("jobseeker"),
  skillValidator,
  validateRequest,
  deleteSkill,
);

/**
 * @openapi
 * /skillset/jobseeker/language:
 *   post:
 *     tags:
 *       - Job Seeker
 *     summary: Add language
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - language
 *             properties:
 *               language:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 30
 *                 example: English
 *     responses:
 *       201:
 *         description: Language added successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 */
router.post(
  "/language",
  authenticateToken,
  authorizeRoles("jobseeker"),
  languageValidator,
  validateRequest,
  addLanguage,
);

/**
 * @openapi
 * /skillset/jobseeker/language:
 *   delete:
 *     tags:
 *       - Job Seeker
 *     summary: Delete language
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - language
 *             properties:
 *               language:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 30
 *                 example: English
 *     responses:
 *       200:
 *         description: Language deleted successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 */
router.delete(
  "/language",
  authenticateToken,
  authorizeRoles("jobseeker"),
  languageValidator,
  validateRequest,
  deleteLanguage,
);

/**
 * @openapi
 * /skillset/jobseeker/summary:
 *   patch:
 *     tags:
 *       - Job Seeker
 *     summary: Update professional summary
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - summary
 *             properties:
 *               summary:
 *                 type: string
 *                 minLength: 20
 *                 maxLength: 1000
 *                 example: Passionate Full Stack Developer with experience in Angular, Node.js, Express, MongoDB, and REST API development.
 *     responses:
 *       200:
 *         description: Summary updated successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 */
router.patch(
  "/summary",
  authenticateToken,
  authorizeRoles("jobseeker"),
  SummaryValidator,
  validateRequest,
  updateSummary,
);

/**
 * @openapi
 * /skillset/jobseeker/preference:
 *   patch:
 *     tags:
 *       - Job Seeker
 *     summary: Update job preferences
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               job_type:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                     - internship
 *                     - job
 *                 example:
 *                   - internship
 *                   - job
 *               join_time:
 *                 type: string
 *                 enum:
 *                   - immediate
 *                   - 15 days
 *                   - 1 month
 *                   - 2 months
 *                   - 3 months
 *                   - more than 3 months
 *                 example: 15 days
 *               locations:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: pune
 *                 example:
 *                   - pune
 *                   - mumbai
 *     responses:
 *       200:
 *         description: Preferences updated successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 */
router.patch(
  "/preference",
  authenticateToken,
  authorizeRoles("jobseeker"),
  updatePreferenceValidator,
  validateRequest,
  updatePreference,
);

/**
 * @openapi
 * /skillset/jobseeker/experience:
 *   post:
 *     tags:
 *       - Job Seeker
 *     summary: Add work experience
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyName
 *               - jobTitle
 *               - employmentType
 *               - startDate
 *             properties:
 *               companyName:
 *                 type: string
 *                 example: Google
 *               jobTitle:
 *                 type: string
 *                 example: Software Engineer
 *               employmentType:
 *                 type: string
 *                 enum:
 *                   - Full-time
 *                   - Part-time
 *                   - Internship
 *                   - Contract
 *                 example: Full-time
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-01-15"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-30"
 *               isCurrentJob:
 *                 type: boolean
 *                 example: false
 *               technologiesUsed:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - Angular
 *                   - Node.js
 *                   - MongoDB
 *               achievements:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - Developed REST APIs
 *                   - Improved application performance by 30%
 *     responses:
 *       201:
 *         description: Experience added successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 */
router.post(
  "/experience",
  authenticateToken,
  authorizeRoles("jobseeker"),
  experienceValidator,
  validateRequest,
  addExperience,
);

/**
 * @openapi
 * /skillset/jobseeker/experience/{expId}:
 *   put:
 *     tags:
 *       - Job Seeker
 *     summary: Update work experience
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: expId
 *         required: true
 *         schema:
 *           type: string
 *         description: Experience ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyName
 *               - jobTitle
 *               - employmentType
 *               - startDate
 *             properties:
 *               companyName:
 *                 type: string
 *                 example: Google
 *               jobTitle:
 *                 type: string
 *                 example: Software Engineer
 *               employmentType:
 *                 type: string
 *                 enum:
 *                   - Full-time
 *                   - Part-time
 *                   - Internship
 *                   - Contract
 *                 example: Full-time
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-01-15"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-30"
 *               isCurrentJob:
 *                 type: boolean
 *                 example: false
 *               technologiesUsed:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - Angular
 *                   - Node.js
 *               achievements:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - Led a team of 5 developers
 *     responses:
 *       200:
 *         description: Experience updated successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Experience not found.
 */
router.put(
  "/experience/:expId",
  authenticateToken,
  authorizeRoles("jobseeker"),
  experienceValidator,
  validateRequest,
  updateExperience,
);

/**
 * @openapi
 * /skillset/jobseeker/experience/{expId}:
 *   delete:
 *     tags:
 *       - Job Seeker
 *     summary: Delete work experience
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: expId
 *         required: true
 *         description: Experience ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Experience deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Experience not found.
 */
router.delete(
  "/experience/:expId",
  authenticateToken,
  authorizeRoles("jobseeker"),
  deleteExperience,
);

export default router;
