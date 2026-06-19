export const EDUCATION_FIELDS = [
  "X",
  "XII",
  "graduation",
  "postgraduation",
  "doctorate",
] as const;

export type EducationField = (typeof EDUCATION_FIELDS)[number];
