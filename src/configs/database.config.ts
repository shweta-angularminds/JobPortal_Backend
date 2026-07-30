import mongoose from "mongoose";
import { env } from "./env.config";

export const dbConnect = async () => {
  try {
    await mongoose.connect(env.mongoUrl);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};
