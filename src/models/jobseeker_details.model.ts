import mongoose, { Schema } from "mongoose";
import { Jobseeker_details } from "../constants/interfaces/jobseeker.interface";
import { InternshipSchema } from "./schemas/internship.schema";
import { ExperienceSchema } from "./schemas/experience.schema";
import { PreferenceSchema } from "./schemas/preference.schema";
import { educationSchema } from "./schemas/education.schema";

export const JobSeekerDetailsSchema = new Schema<Jobseeker_details>(
  {
    User_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true,
    },
    education: {
      type: educationSchema,
      default: () => ({}),
    },
    languages: {
      type: [String],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    summary: {
      type: String,

      default: "",
    },
    internship: {
      type: InternshipSchema,
      default: () => ({}),
    },
    preference: {
      type: PreferenceSchema,
      default: () => ({}),
    },
    experience: {
      type: [ExperienceSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);
const JobSeekerDetailsModel = mongoose.model<Jobseeker_details>(
  "jobseekerDetails",
  JobSeekerDetailsSchema,
);

export default JobSeekerDetailsModel;
