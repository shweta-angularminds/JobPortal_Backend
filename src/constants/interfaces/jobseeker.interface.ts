import { EducationField } from "../variables/jobseeker.constants";

export interface AddEducationDto {
  educationField: EducationField;
  educationData: any;
}

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
