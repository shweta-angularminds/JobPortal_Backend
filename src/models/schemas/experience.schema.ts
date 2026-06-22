import { Schema } from "mongoose";
import { Experience } from "../../constants/interfaces/user.interface";

export const ExperienceSchema = new Schema<Experience>(
  {
    companyName: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: "",
    },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract"],
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    isCurrentJob: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: "",
    },
    technologiesUsed: {
      type: [String],
      default: [],
    },
    achievements: {
      type: [String],
      default: [],
    },
  },
  
);
