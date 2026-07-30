import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinary.config";
import { Request, Response, NextFunction } from "express";
import { STATUS_BAD_REQUEST } from "../constants/status/http.status";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "jobportal/images",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  }),
});

const multerUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("INVALID_IMAGE_TYPE"));
    }
  },
});

const uploadImage = (fieldName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    multerUpload.single(fieldName)(req, res, (error) => {
      if (error) {
        if (
          error instanceof multer.MulterError &&
          error.code === "LIMIT_FILE_SIZE"
        ) {
          return res.status(STATUS_BAD_REQUEST).json({
            success: false,
            message: "Image size should not exceed 5 MB",
          });
        }

        if (error.message === "INVALID_IMAGE_TYPE") {
          return res.status(STATUS_BAD_REQUEST).json({
            success: false,
            message: "Only jpg, png and webp images are allowed",
          });
        }

        return res.status(STATUS_BAD_REQUEST).json({
          success: false,
          message: error.message,
        });
      }

      next();
    });
  };
};

export default uploadImage;
