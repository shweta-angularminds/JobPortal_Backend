import dotenv from "dotenv";
dotenv.config();

import { Router } from "express";
import authenticateToken from "../middleware/auth.middleware";
import upload from "../middleware/multer.middleware";
import {
  changePassword,
  employerProfile,
  getAllEmployers,
  getEmployerById,
  updateEmployerDetails,
} from "../controllers/employer.controller";

const router = Router();

router.get("/profile", authenticateToken, employerProfile);

router.put(
  "/profile/update",
  authenticateToken,
  upload("companyLogo"),
  updateEmployerDetails
);

router.put("/change-password", authenticateToken, changePassword);

router.get("/", getAllEmployers);

router.get("/:id", getEmployerById);

export default router;
