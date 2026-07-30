/**
 * @openapi
 * components:
 *   schemas:
 *     JobInput:
 *       type: object
 *       required:
 *         - designation
 *         - location
 *         - experience
 *         - positions
 *         - workType
 *         - salary
 *         - qualifications
 *         - skills
 *         - employementType
 *         - industry
 *         - department
 *         - desc
 *       properties:
 *         designation:
 *           type: string
 *           example: Software Engineer
 *         location:
 *           type: string
 *           example: Pune
 *         experience:
 *           type: string
 *           example: 2-4 Years
 *         positions:
 *           type: integer
 *           example: 5
 *         workType:
 *           type: string
 *           example: Hybrid
 *         salary:
 *           type: number
 *           example: 800000
 *         qualifications:
 *           type: string
 *           example: B.E./B.Tech in Computer Science
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - Node.js
 *             - Express
 *             - MongoDB
 *         employementType:
 *           type: string
 *           example: Full Time
 *         industry:
 *           type: string
 *           example: Information Technology
 *         department:
 *           type: string
 *           example: Engineering
 *         desc:
 *           type: string
 *           example: We are looking for an experienced Software Engineer...
 *
 *     Job:
 *       allOf:
 *         - $ref: '#/components/schemas/JobInput'
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: 64f1b2c3d4e5f67890123456
 *             employer:
 *               type: string
 *               description: Employer MongoDB ID who posted the job
 *               example: 64f1b2c3d4e5f67890123499
 *             createdAt:
 *               type: string
 *               format: date-time
 *             updatedAt:
 *               type: string
 *               format: date-time
 */

// This file has no runtime exports; it exists purely to host reusable
// OpenAPI component schemas that other *.docs.ts files reference via $ref.
export {};
