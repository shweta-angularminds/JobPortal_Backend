import { Router } from "express";

import {
  applyJob,
  checkJobApplied,
  getApplicationsCount,
  getSingleJobInfo,
  seeApplications,
  updateStatus,
  viewAllAppliedJobsOfUser,
} from "../controllers/application.controller";
import authenticateToken, {
  authorizeRoles,
} from "../middleware/auth.middleware";

const router = Router();

// __________________ JobSeeker _____________________

router.post("/apply", authenticateToken, authorizeRoles("jobseeker"), applyJob);


router.get(
  "/viewAll",
  authenticateToken,
  authorizeRoles("jobseeker"),
  viewAllAppliedJobsOfUser,
);

router.get(
  "/check/:jobId",
  authenticateToken,
  authorizeRoles("jobseeker"),
  checkJobApplied,
);

//_________________________ Employer _____________________________

router.get("/view/:id", getSingleJobInfo);

router.post("/getApplicationsCount", getApplicationsCount);

router.get("/see-applications/:id", seeApplications);

router.put("/update-status", updateStatus);

export default router;
