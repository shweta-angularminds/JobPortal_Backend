/**
 * @openapi
 * components:
 *   schemas:
 *     EmployerProfileUpdateInput:
 *       type: object
 *       required:
 *         - employer_name
 *         - email
 *         - companyName
 *         - contactNumber
 *         - address
 *         - website
 *       properties:
 *         employer_name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         companyName:
 *           type: string
 *           example: ABC Technologies
 *         contactNumber:
 *           type: string
 *           example: "9876543210"
 *         address:
 *           type: string
 *           example: Pune, Maharashtra
 *         website:
 *           type: string
 *           format: uri
 *           example: https://www.abctech.com
 *         companyLogo:
 *           type: string
 *           format: binary
 *           description: Company logo (jpg, png, or webp, max 5 MB)
 *
 *     ChangePasswordInput:
 *       type: object
 *       required:
 *         - password
 *         - newPassword
 *       properties:
 *         password:
 *           type: string
 *           format: password
 *           description: Current password
 *           example: OldPassword@123
 *         newPassword:
 *           type: string
 *           format: password
 *           description: >
 *             New password. Must be at least 8 characters long and contain
 *             at least one uppercase letter, one lowercase letter,
 *             one number, and one special character.
 *           example: NewPassword@123
 *
 *     Employer:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64f1b2c3d4e5f67890123456
 *         employer_name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           example: john@example.com
 *         companyName:
 *           type: string
 *           example: ABC Technologies
 *         contactNumber:
 *           type: string
 *           example: "9876543210"
 *         address:
 *           type: string
 *           example: Pune, Maharashtra
 *         website:
 *           type: string
 *           example: https://www.abctech.com
 *         companyLogo:
 *           type: string
 *           example: https://cdn.skillsetworks.com/logos/abc.png
 */

export {};
