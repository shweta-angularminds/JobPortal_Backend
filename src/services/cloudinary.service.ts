import cloudinary from "../configs/cloudinary.config";
import { extractPublicId } from "../utils/extractPublicId";

export const deleteImageFromCloudinary = async (imageUrl: string) => {
  try {
    await cloudinary.uploader.destroy(extractPublicId(imageUrl));
  } catch (error) {
    console.error(error);
  }
};
export const deleteRawFileFromCloudinary = async (fileUrl: string) => {
  try {
    await cloudinary.uploader.destroy(extractPublicId(fileUrl, true), {
      resource_type: "raw",
    });
  } catch (error) {
    console.error(error);
  }
};