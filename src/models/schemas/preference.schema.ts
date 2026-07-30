import { Schema } from "mongoose";
import { Preference } from "../../constants/interfaces/jobseeker.interface";

export const PreferenceSchema = new Schema<Preference>(
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
  },
);
