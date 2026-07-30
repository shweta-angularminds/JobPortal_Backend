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
 *             $ref: '#/components/schemas/JobseekerProfileUpdateInput'
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 *
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
 *   delete:
 *     tags:
 *       - Job Seeker
 *     summary: Delete profile picture
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile picture deleted successfully.
 *
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
 *
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
 *
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
 *             $ref: '#/components/schemas/EducationInput'
 *     responses:
 *       201:
 *         description: Education added successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 *
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
 *             $ref: '#/components/schemas/SkillInput'
 *     responses:
 *       201:
 *         description: Skill added successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
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
 *             $ref: '#/components/schemas/SkillInput'
 *     responses:
 *       200:
 *         description: Skill deleted successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 *
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
 *             $ref: '#/components/schemas/LanguageInput'
 *     responses:
 *       201:
 *         description: Language added successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
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
 *             $ref: '#/components/schemas/LanguageInput'
 *     responses:
 *       200:
 *         description: Language deleted successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 *
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
 *             $ref: '#/components/schemas/SummaryInput'
 *     responses:
 *       200:
 *         description: Summary updated successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 *
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
 *             $ref: '#/components/schemas/PreferenceInput'
 *     responses:
 *       200:
 *         description: Preferences updated successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 *
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
 *             $ref: '#/components/schemas/ExperienceInput'
 *     responses:
 *       201:
 *         description: Experience added successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 *
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
 *             $ref: '#/components/schemas/ExperienceInput'
 *     responses:
 *       200:
 *         description: Experience updated successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Experience not found.
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

export {};
