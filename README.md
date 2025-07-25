# 💼 Job Portal Backend

This is the backend for a full-stack **Job Portal** application, built with **Node.js**, **Express**, **MongoDB**, and **TypeScript**. It supports two user roles: **Employer** and **Jobseeker**, with authentication, job management, resume uploads, and application tracking.

---

## 🚀 Features

### 👨‍💼 Employer

* Register & login with company logo
* Create, update, delete job listings
* View all jobs and applicants
* Maintain employer profile and company details

### 👤 Jobseeker

* Register & login with resume upload
* Build profile with education, skills, languages, summary, preferences
* Apply to jobs and view application status
* View company profiles and open positions

---

## 🔐 Authentication

* Employers and jobseekers have separate login/register routes
* JWT-based token authentication used for protected routes

---

## 📁 File Uploads

* Employers can upload company logos
* Jobseekers upload resumes and profile pictures
* All uploads stored in the `/uploads` folder

---

## 📦 API Endpoints

### Auth Routes (`/skillset/auth`)

* `POST /employer/login`
* `POST /employer/register`
* `POST /jobseeker/login`
* `POST /jobseeker/register`

### Employer Routes (`/skillset/employers`)

* `GET /` - List all employers
* `GET /:id` - Employer by ID
* `GET /profile` - Logged-in employer profile
* `PUT /profile/update` - Update profile
* `PUT /change-password` - Change password

### Job Routes (`/skillset/employers/jobs`)

* `POST /add` - Create job
* `PUT /update/:id` - Update job
* `DELETE /delete/:id` - Delete job
* `GET /view/all` - View all jobs
* `GET /company/:id` - Jobs by company
* `GET /candidate/:id` - Get applicants

### Jobseeker Routes (`/skillset/jobseeker`)

* `GET /:user_id/details` - Full profile
* `POST/GET/PUT` Education, Skills, Language
* `PATCH` Summary and Preferences

### User Profile (`/skillset/user`)

* `GET /profile` - View profile
* `PATCH /update-profile` - Update profile
* `PATCH /upload-pic` - Upload profile picture
* `PATCH /:user_id/update-resume` - Upload resume
* `DELETE /delete-profile-pic`

### Applications (`/skillset/application`)

* `POST /apply` - Apply to job
* `GET /viewAll/:user_Id` - Jobseeker’s applications
* `GET /see-applications/:id` - Applicants for job
* `PUT /update-status` - Update application status

### Resume Download (`/download`)

* `GET /download-resume/:filename` - Resume file download

---

## 🛠 Tech Stack

* **Backend**: Node.js, Express, TypeScript
* **Database**: MongoDB with Mongoose
* **Authentication**: JWT
* **File Uploads**: Multer
* **Dev Tools**: Nodemon, ts-node

---

## 📂 Project Structure

```
src/
├── configs/
├── controllers/
├── middleware/
├── models/
├── routers/
├── uploads/
├── app.ts
├── server.ts
```

---

## 📦 Scripts

```bash
# Start in dev mode
npm run dev

# Build TypeScript
npm run build

# Start from build
npm start
```

---

## 🌐 CORS

CORS is enabled for requests from:

```
http://localhost:4200
```

---

## 📝 Notes

* `.env` is required with MongoDB URI and secret keys.
* `uploads/` folder must exist for file uploads to work.
* Add `built/` and `uploads/` to `.gitignore` if not deploying them.
