import { Router } from "express";

import {
  applyJob,
  getApplicationsCount,
  getSingleJobInfo,
  seeApplications,
  updateStatus,
  viewAllAppliedJobsOfUser,
} from "../controllers/application.controller";

const router = Router();

router.post("/apply", applyJob);

router.get("/viewAll/:user_Id", viewAllAppliedJobsOfUser);

router.get("/view/:id", getSingleJobInfo);

router.post("/getApplicationsCount", getApplicationsCount);

router.get("/see-applications/:id", seeApplications);

router.put("/update-status", updateStatus);

export default router;
