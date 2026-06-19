import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinary.config";
import { Request, Response, NextFunction } from "express";
import { STATUS_BAD_REQUEST } from "../constants/status/http.status";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const ext = file.originalname.split(".").pop();

    return {
      folder: "jobportal/resumes",
      resource_type: "raw",
      public_id: `resume_${Date.now()}`,
      format: ext,
    };
  },
});

const multerUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    const allowedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("INVALID_FILE_TYPE"));
    }
  },
});

const uploadResume = (req: Request, res: Response, next: NextFunction) => {
  multerUpload.single("resume")(req, res, (error) => {
    if (error) {
      if (
        error instanceof multer.MulterError &&
        error.code === "LIMIT_FILE_SIZE"
      ) {
        return res.status(STATUS_BAD_REQUEST).json({
          success: false,
          message: "Resume size should not exceed 5 MB",
        });
      }

      if (error.message === "INVALID_FILE_TYPE") {
        return res.status(STATUS_BAD_REQUEST).json({
          success: false,
          message: "Only PDF, DOC and DOCX files are allowed",
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

export default uploadResume;
