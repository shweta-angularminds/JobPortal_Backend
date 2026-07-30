# Job Portal Backend

RESTful API for a Job Portal application built with Node.js, Express, TypeScript, and MongoDB. The backend provides authentication, employer and job seeker management, job posting, job applications, and file uploads using Cloudinary.

---

## Features

- JWT Authentication
- Employer Registration & Login
- Job Seeker Registration & Login
- Employer Profile Management
- Job CRUD Operations
- Apply for Jobs
- View Applications
- Resume Upload
- Company Logo Upload
- Cloudinary Integration
- Centralized Error Handling
- Rate Limiting
- Security Headers using Helmet
- Response Compression

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- Multer
- Cloudinary
- Helmet
- Express Rate Limit
- Compression

---

## Folder Structure

```
src/
│
├── configs/
├── constants/
├── controllers/
├── middleware/
├── models/
├── routers/
├── services/
├── utils/
├── app.ts
└── server.ts
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate to project

```bash
cd jobPortal_backend
```

Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
MONGO_URL=
SECRET_KEY=
PORT=5000

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## Run Locally

Development

```bash
npm run dev
```

Build

```bash
npm run build
```

Production

```bash
npm start
```

---

## API Base URL

```
http://localhost:5000
```

---
## Swagger API Docs URL

```
http://localhost:5000/api-docs
```

---

## Main Routes

| Route | Description |
|--------|-------------|
| `/skillset/auth` | Authentication |
| `/skillset/jobs` | Jobs |
| `/skillset/employers` | Employers |
| `/skillset/jobseeker` | Job Seekers |
| `/skillset/application` | Applications |

---

## Security

- Helmet
- Express Rate Limit
- CORS
- Environment Variables
- JWT Authentication

---
## Notes

* `.env` is required with MongoDB URI and secret keys.
* `uploads/` folder must exist for file uploads to work.
* Add `built/` and `uploads/` to `.gitignore` if not deploying them.
 
 ---

## Future Improvements

- Refresh Token Authentication
- Swagger/OpenAPI Documentation
- Unit & Integration Tests
- Docker Support
- CI/CD Pipeline
- Logging with Pino/Winston
- Redis Caching
- Email Notifications

---

## Author

Shweta