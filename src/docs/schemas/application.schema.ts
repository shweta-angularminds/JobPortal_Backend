/**
 * @openapi
 * components:
 *   schemas:
 *     ApplyJobInput:
 *       type: object
 *       required:
 *         - job_Id
 *       properties:
 *         job_Id:
 *           type: string
 *           description: Job MongoDB ID
 *           example: 64f1b2c3d4e5f67890123456
 *
 *     ApplicationStatus:
 *       type: string
 *       enum:
 *         - pending
 *         - approved
 *         - rejected
 *         - shortlisted
 *
 *     UpdateApplicationStatusInput:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           $ref: '#/components/schemas/ApplicationStatus'
 *
 *     Application:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64f1b2c3d4e5f67890123456
 *         job:
 *           type: string
 *           description: Job MongoDB ID
 *           example: 64f1b2c3d4e5f67890123457
 *         jobseeker:
 *           type: string
 *           description: Jobseeker MongoDB ID
 *           example: 64f1b2c3d4e5f67890123458
 *         status:
 *           $ref: '#/components/schemas/ApplicationStatus'
 *         createdAt:
 *           type: string
 *           format: date-time
 */

export {};
