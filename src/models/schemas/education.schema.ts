import { Schema } from "mongoose";

export const educationSchema = new Schema(
  {
    X: {
      board_name: { type: String, default: "" },
      passing_year: { type: String, default: "" },
      medium: { type: String, default: "" },
      percentage: { type: String, default: "" },
    },
    XII: {
      board_name: { type: String, default: "" },
      passing_year: { type: String, default: "" },
      medium: { type: String, default: "" },
      percentage: { type: String, default: "" },
    },
    graduation: {
      course_name: { type: String, default: "" },
      college_name: { type: String, default: "" },
      university: { type: String, default: "" },
      percentage: { type: String, default: "" },
      cgpa: { type: String, default: "" },
      start_year: { type: String, default: "" },
      end_year: { type: String, default: "" },
    },
    postgraduation: {
      course_name: { type: String, default: "" },
      college_name: { type: String, default: "" },
      university: { type: String, default: "" },
      percentage: { type: String, default: "" },
      cgpa: { type: String, default: "" },
      start_year: { type: String, default: "" },
      end_year: { type: String, default: "" },
    },
    doctorate: {
      course_name: { type: String, default: "" },
      college_name: { type: String, default: "" },
      university: { type: String, default: "" },
      percentage: { type: String, default: "" },
      cgpa: { type: String, default: "" },
      start_year: { type: String, default: "" },
      end_year: { type: String, default: "" },
    },
  },
  {
    _id: false,
  },
);
