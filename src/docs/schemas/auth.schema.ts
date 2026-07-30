/**
 * @openapi
 * components:
 *   schemas:
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: john@example.com
 *         password:
 *           type: string
 *           example: Password@123
 *
 *     EmployerRegisterInput:
 *       type: object
 *       required:
 *         - employer_name
 *         - email
 *         - companyName
 *         - contactNumber
 *         - address
 *         - website
 *         - password
 *         - companyLogo
 *       properties:
 *         employer_name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           example: hr@skillsetworks.com
 *         companyName:
 *           type: string
 *           example: SkillsetWorks
 *         contactNumber:
 *           type: string
 *           example: "9876543210"
 *         address:
 *           type: string
 *           example: Pune, Maharashtra, India
 *         website:
 *           type: string
 *           format: uri
 *           example: https://www.skillsetworks.com
 *         password:
 *           type: string
 *           format: password
 *           minLength: 8
 *           example: Password@123
 *         companyLogo:
 *           type: string
 *           format: binary
 *           description: Company logo (JPG, JPEG, PNG, max 5 MB)
 *
 *     JobSeekerRegisterInput:
 *       type: object
 *       required:
 *         - username
 *         - phone
 *         - email
 *         - password
 *         - fresher
 *         - resume
 *       properties:
 *         username:
 *           type: string
 *           minLength: 2
 *           maxLength: 30
 *           example: Shweta Patil
 *         phone:
 *           type: string
 *           example: "9876543210"
 *         email:
 *           type: string
 *           format: email
 *           example: shweta@example.com
 *         password:
 *           type: string
 *           format: password
 *           minLength: 8
 *           maxLength: 20
 *           example: Password@123
 *         fresher:
 *           type: boolean
 *           example: true
 *         resume:
 *           type: string
 *           format: binary
 */

export {};
