import dotenv from "dotenv";
dotenv.config();

import { Router } from "express";
import authenticateToken from "../middleware/auth.middleware";

import {
  changePassword,
  employerProfile,
  getAllEmployers,
  getEmployerById,
  updateEmployerDetails,
} from "../controllers/employer.controller";
import uploadImage from "../middleware/uploadImage";

const router = Router();

router.get("/profile", authenticateToken, employerProfile);

router.put(
  "/profile/update",
  authenticateToken,
  uploadImage("companyLogo"),
  updateEmployerDetails
);

router.put("/change-password", authenticateToken, changePassword);

router.get("/", getAllEmployers);

router.get("/:id", getEmployerById);

export default router;
