import mongoose, { Schema } from "mongoose";
import {
  InternShip,
  Jobseeker_details,
  Preference,
} from "../constants/interfaces/user.interface";

const educationSchema = new Schema(
  {
    X: {
      board_name: { type: String, required: false, default: "" },
      passing_year: { type: String, required: false, default: "" },
      medium: { type: String, required: false, default: "" },
      percentage: { type: String, required: false, default: "" },
    },
    XII: {
      board_name: { type: String, required: false, default: "" },
      passing_year: { type: String, required: false, default: "" },
      medium: { type: String, required: false, default: "" },
      percentage: { type: String, required: false, default: "" },
    },
    graduation: {
      course_name: { type: String, required: false, default: "" },
      college_name: { type: String, required: false, default: "" },
      university: { type: String, required: false, default: "" },
      percentage: { type: String, required: false, default: "" },
      cgpa: { type: String, required: false, default: "" },
      start_year: { type: String, required: false, default: "" },
      end_year: { type: String, required: false, default: "" },
    },
    postgraduation: {
      course_name: { type: String, required: false, default: "" },
      college_name: { type: String, required: false, default: "" },
      university: { type: String, required: false, default: "" },
      percentage: { type: String, required: false, default: "" },
      cgpa: { type: String, required: false, default: "" },
      start_year: { type: String, required: false, default: "" },
      end_year: { type: String, required: false, default: "" },
    },
    doctorate: {
      course_name: { type: String, required: false, default: "" },
      college_name: { type: String, required: false, default: "" },
      university: { type: String, required: false, default: "" },
      percentage: { type: String, required: false, default: "" },
      cgpa: { type: String, required: false, default: "" },
      start_year: { type: String, required: false, default: "" },
      end_year: { type: String, required: false, default: "" },
    },
  },
  {
    _id: false,
  }
);
const PreferenceSchema = new Schema<Preference>(
  {
    job_type: {
      type: [String],
      enum: ["internship", "job"],
      default: [],
    },
    join_time: {
      type: String,
      required: false,
      enum: [
        "15 days",
        "1 month",
        "2 months",
        "3 months",
        "more than 3 months",
      ],
      default: "1 month",
    },
    locations: {
      type: [String],
      enum: [
        "mumbai",
        "pune",
        "delhi",
        "hyderabad",
        "chennai",
        "bangalore",
        "chandigarh",
        "kolkata",
        "gurgaon",
        "ahemdabad",
      ],
      default: [],
    },
  },
  {
    _id: false,
  }
);
const InternshipSchema = new Schema<InternShip>(
  {
    project_name: {
      type: String,

      default: "",
    },
    company_name: {
      type: String,

      default: "",
    },
    desc: {
      type: String,

      default: "",
    },
    skills: {
      type: [String],
      required: false,
      default: [],
    },
    project_URL: {
      type: String,
      required: false,
      default: "",
    },
    duration: {
      type: String,

      default: "",
    },
  },
  {
    _id: false,
  }
);

// Main schema for JobseekerDetails
export const JobSeekerDetailsSchema = new Schema<Jobseeker_details>(
  {
    User_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    education: educationSchema,
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
    internship: InternshipSchema,
    preference: PreferenceSchema,
  },
  {
    timestamps: true,
  }
);
const JobSeekerDetailsModel = mongoose.model<Jobseeker_details>(
  "jobseekerDetails",
  JobSeekerDetailsSchema
);

export default JobSeekerDetailsModel;
