import { model, Schema } from "mongoose";
import { Application } from "../constants/interfaces/application.interface";

export const applicationSchema = new Schema<Application>(
  {
    job_Id: {
      type: Schema.Types.ObjectId,
      ref: "jobs",
      required: true,
    },
    user_Id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    status: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
export const applicationModel = model<Application>(
  "applications",
  applicationSchema
);
