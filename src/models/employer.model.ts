import { model, Schema } from "mongoose";
import { employer } from "../constants/interfaces/employer.interface";

export const employerSchema = new Schema<employer>(
  {
    employer_name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: true,
      unique: true,
    },
    companyLogo: {
      type: String,
      required: true,
      unique: true,
    },
    contactNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const employerModel = model<employer>("employers", employerSchema);
