import { model, Schema } from "mongoose";
import { Job } from "../constants/interfaces/jobs.interface";

export const JobSchema = new Schema<Job>(
  {
    designation: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    positions: {
      type: Number,
      required: true,
    },
    workType: {
      type: String,
      required: true,
    },
    qualifications: {
      type: [String],
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    employementType: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },
    employer_id: {
      type: Schema.Types.ObjectId,
      ref: "employers",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const jobModel = model<Job>("jobs", JobSchema);
