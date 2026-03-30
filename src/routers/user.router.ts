import { Router } from "express";

import authenticateUserToken from "../middleware/userAuth.middleware";

import {
  deleteProfilePicture,
  getProfile,
  updateProfile,
  updateProfilePicture,
  updateResume,
} from "../controllers/user.controller";
import uploadResume from "../middleware/uploadResume";
import uploadImage from "../middleware/uploadImage";

const router = Router();

router.get("/profile", authenticateUserToken, getProfile);

router.patch("/update-profile", authenticateUserToken, updateProfile);

router.patch(
  "/upload-pic",
  authenticateUserToken,
  uploadImage("profilePic"),
  updateProfilePicture
);

router.patch("/:user_id/update-resume", uploadResume, updateResume);

router.delete(
  "/delete-profile-pic",
  authenticateUserToken,
  deleteProfilePicture
);

export default router;
