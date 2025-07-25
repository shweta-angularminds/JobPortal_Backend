import { Router } from "express";
import uploadFile from "../middleware/file.multer";
import authenticateUserToken from "../middleware/userAuth.middleware";
import upload from "../middleware/multer.middleware";
import {
  deleteProfilePicture,
  getProfile,
  updateProfile,
  updateProfilePicture,
  updateResume,
} from "../controllers/user.controller";

const router = Router();

router.get("/profile", authenticateUserToken, getProfile);

router.patch("/update-profile", authenticateUserToken, updateProfile);

router.patch(
  "/upload-pic",
  authenticateUserToken,
  upload("profilePic"),
  updateProfilePicture
);

router.patch("/:user_id/update-resume", uploadFile, updateResume);

router.delete(
  "/delete-profile-pic",
  authenticateUserToken,
  deleteProfilePicture
);

export default router;
