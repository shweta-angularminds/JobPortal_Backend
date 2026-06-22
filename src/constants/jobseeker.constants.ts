export const EDUCATION_FIELDS = [
  "X",
  "XII",
  "graduation",
  "postgraduation",
  "doctorate",
] as const;

export type EducationField = (typeof EDUCATION_FIELDS)[number];

export const JOB_TYPES = ["internship", "job"] as const;

export const JOIN_TIMES = [
  "immediate",
  "15 days",
  "1 month",
  "2 months",
  "3 months",
  "more than 3 months",
] as const;

export const LOCATIONS = [
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
] as const;