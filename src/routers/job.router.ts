import { Router } from "express";
import authenticateToken from "../middleware/auth.middleware";
import {
  applicantsDetails,
  createNewJob,
  deleteJob,
  getAllJobs,
  getJobByCompany,
  getJobDetails,
  updateJobDetails,
} from "../controllers/job.controller";

const router = Router();

router.get("/company/:id", getJobByCompany);

router.get("/:id", getJobDetails);

// BELOW ROUTES ARE FOR EMPLOYERS TO PERFORM CRUD ON JOBS

router.get("/view/all", authenticateToken, getAllJobs);

router.post("/add", authenticateToken, createNewJob);

router.put("/update/:id", authenticateToken, updateJobDetails);

router.delete("/delete/:id", authenticateToken, deleteJob);

router.get("/candidate/:id", applicantsDetails);

export default router;
