import { Schema } from "mongoose";
import { InternShip } from "../../constants/interfaces/user.interface";

export const InternshipSchema = new Schema<InternShip>(
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
      default: [],
    },
    project_URL: {
      type: String,
      default: "",
    },
    duration: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  },
);
