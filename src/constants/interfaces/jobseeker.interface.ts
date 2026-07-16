import { EducationField } from "../variables/jobseeker.constants";

export interface AddEducationDto {
  educationField: EducationField;
  educationData: EducationData;
}

export interface SchoolEducation {
  board_name: string;
  passing_year: string;
  medium: string;
  percentage: string;
}

export interface HigherEducation {
  course_name: string;
  college_name: string;
  university: string;
  percentage: string;
  cgpa: string;
  start_year: string;
  end_year: string;
}

export type EducationData = SchoolEducation | HigherEducation;

export interface UpdatePreferenceDto {
  job_type?: ("internship" | "job")[];
  join_time?:
    | "immediate"
    | "15 days"
    | "1 month"
    | "2 months"
    | "3 months"
    | "more than 3 months";

  locations?: string[];
}
