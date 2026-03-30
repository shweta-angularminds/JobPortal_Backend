import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinary.config";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: "jobportal/images",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    
  }),
});

const uploadImage = (fieldName:string)=>multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single(fieldName);

export default uploadImage;
