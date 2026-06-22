import { Router } from "express";
import {
  deleteProfilePicture,
  getProfile,
  updateProfile,
  updateProfilePicture,
  updateResume,
} from "../controllers/user.controller";
import uploadResume from "../middleware/uploadResume";
import uploadImage from "../middleware/uploadImage";
import authenticateToken, {
  authorizeRoles,
} from "../middleware/auth.middleware";
import { updateProfileValidator } from "../validations/user.validator";
import { validateRequest } from "../middleware/validation.middleware";
import { validateProfilePicture } from "../validations/profilePicture.validator";
import { validateResume } from "../validations/resume.validator";

const router = Router();

router.get(
  "/profile",
  authenticateToken,
  authorizeRoles("jobseeker"),
  getProfile,
);

router.patch(
  "/update-profile",
  authenticateToken,
  authorizeRoles("jobseeker"),
  updateProfileValidator,
  validateRequest,
  updateProfile,
);

router.patch(
  "/upload-pic",
  authenticateToken,
  authorizeRoles("jobseeker"),
  uploadImage("profilePic"),
  validateProfilePicture,
  updateProfilePicture,
);

router.patch(
  "/update-resume",
  authenticateToken,
  authorizeRoles("jobseeker"),
  uploadResume,
  validateResume,
  updateResume,
);

router.delete(
  "/delete-profile-pic",
  authenticateToken,
  authorizeRoles("jobseeker"),
  deleteProfilePicture,
);

export default router;
