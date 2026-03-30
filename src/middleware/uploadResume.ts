import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinary.config";


const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    

    return {
      folder: "jobportal/resumes",
      resource_type: "raw",
      allowed_formats: ["pdf", "doc", "docx"],
    };
  },
});

const uploadResume = multer({
    storage,
    limits:{fileSize:5 * 1024*1024},
}).single("resume")

export default uploadResume