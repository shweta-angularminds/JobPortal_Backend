import mongoose, { Schema } from "mongoose";
import { Jobseeker } from "../constants/interfaces/jobseeker.interface";


const jobseekerSchema: Schema = new Schema<Jobseeker>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    fresher: {
      type: Boolean,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
    bdate: {
      type: Date,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    profilePic: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const JobseekerModel = mongoose.model<Jobseeker>("jobseekers", jobseekerSchema);

export default JobseekerModel;
