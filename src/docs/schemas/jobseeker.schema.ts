/**
 * @openapi
 * components:
 *   schemas:
 *     JobseekerProfileUpdateInput:
 *       type: object
 *       required:
 *         - email
 *         - username
 *         - phone
 *         - location
 *         - gender
 *         - fresher
 *         - bdate
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         username:
 *           type: string
 *           example: John Doe
 *         phone:
 *           type: string
 *           example: "9876543210"
 *         location:
 *           type: string
 *           example: Pune, Maharashtra
 *         gender:
 *           type: string
 *           enum:
 *             - male
 *             - female
 *             - other
 *           example: male
 *         fresher:
 *           type: boolean
 *           example: false
 *         bdate:
 *           type: string
 *           format: date
 *           example: "2000-08-15"
 *
 *     EducationInput:
 *       type: object
 *       required:
 *         - educationField
 *         - educationData
 *       properties:
 *         educationField:
 *           type: string
 *           enum:
 *             - X
 *             - XII
 *             - graduation
 *             - postgraduation
 *             - doctorate
 *           example: XII
 *         educationData:
 *           oneOf:
 *             - $ref: '#/components/schemas/SchoolEducationData'
 *             - $ref: '#/components/schemas/HigherEducationData'
 *
 *     SchoolEducationData:
 *       type: object
 *       description: School Education (X/XII)
 *       properties:
 *         board_name:
 *           type: string
 *           example: Maharashtra State Board
 *         passing_year:
 *           type: string
 *           example: "2020"
 *         medium:
 *           type: string
 *           example: English
 *         percentage:
 *           type: string
 *           example: "89.5"
 *
 *     HigherEducationData:
 *       type: object
 *       description: Higher Education (Graduation/Postgraduation/Doctorate)
 *       properties:
 *         course_name:
 *           type: string
 *           example: MCA
 *         college_name:
 *           type: string
 *           example: ABC College
 *         university:
 *           type: string
 *           example: Savitribai Phule Pune University
 *         percentage:
 *           type: string
 *           example: "82.4"
 *         cgpa:
 *           type: string
 *           example: "8.75"
 *         start_year:
 *           type: string
 *           example: "2022"
 *         end_year:
 *           type: string
 *           example: "2024"
 *
 *     SkillInput:
 *       type: object
 *       required:
 *         - skill
 *       properties:
 *         skill:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: Angular
 *
 *     LanguageInput:
 *       type: object
 *       required:
 *         - language
 *       properties:
 *         language:
 *           type: string
 *           minLength: 2
 *           maxLength: 30
 *           example: English
 *
 *     SummaryInput:
 *       type: object
 *       required:
 *         - summary
 *       properties:
 *         summary:
 *           type: string
 *           minLength: 20
 *           maxLength: 1000
 *           example: Passionate Full Stack Developer with experience in Angular, Node.js, Express, MongoDB, and REST API development.
 *
 *     PreferenceInput:
 *       type: object
 *       properties:
 *         job_type:
 *           type: array
 *           items:
 *             type: string
 *             enum:
 *               - internship
 *               - job
 *           example:
 *             - internship
 *             - job
 *         join_time:
 *           type: string
 *           enum:
 *             - immediate
 *             - 15 days
 *             - 1 month
 *             - 2 months
 *             - 3 months
 *             - more than 3 months
 *           example: 15 days
 *         locations:
 *           type: array
 *           items:
 *             type: string
 *             example: pune
 *           example:
 *             - pune
 *             - mumbai
 *
 *     ExperienceInput:
 *       type: object
 *       required:
 *         - companyName
 *         - jobTitle
 *         - employmentType
 *         - startDate
 *       properties:
 *         companyName:
 *           type: string
 *           example: Google
 *         jobTitle:
 *           type: string
 *           example: Software Engineer
 *         employmentType:
 *           type: string
 *           enum:
 *             - Full-time
 *             - Part-time
 *             - Internship
 *             - Contract
 *           example: Full-time
 *         startDate:
 *           type: string
 *           format: date
 *           example: "2023-01-15"
 *         endDate:
 *           type: string
 *           format: date
 *           example: "2025-06-30"
 *         isCurrentJob:
 *           type: boolean
 *           example: false
 *         technologiesUsed:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - Angular
 *             - Node.js
 *             - MongoDB
 *         achievements:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - Developed REST APIs
 *             - Improved application performance by 30%
 */

export {};
