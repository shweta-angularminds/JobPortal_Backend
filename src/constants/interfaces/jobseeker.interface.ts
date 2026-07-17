import { EducationField } from "../variables/jobseeker.constants";

import { ObjectId } from "mongoose";

export interface Jobseeker {
  username: string;
  phone: string;
  email: string;
  fresher: boolean;
  password: string;
  resume: string;
  location?: string;
  gender?: string;
  bdate?: string;
  profilePic?: string;
}

export interface jobseekerRegisterDto {
  username: string;
  phone: string;
  email: string;
  password: string;
  fresher: boolean;
  resume?: string;
}

export interface UpdateProfileDto {
  email?: string;
  phone?: string;
  username?: string;
  bdate?: Date;
  gender?: "male" | "female" | "other";
  location?: string;
  fresher?: boolean;
}

export interface Jobseeker_details {
  User_id: ObjectId;
  education: Education;
  languages: string[];
  skills: string[];
  summary: string;
  internship: InternShip;
  preference: Preference;
  experience: Experience[];
}
export interface Experience {
  _id: ObjectId;
  companyName: string;
  jobTitle: string;
  location?: string;
  employmentType?: "Full-time" | "Part-time" | "Internship" | "Contract";
  startDate: Date;
  endDate?: Date;
  isCurrentJob?: boolean;
  description?: string;
  technologiesUsed?: string[];
  achievements?: string[];
}
export interface InternShip {
  project_name: string;
  company_name: string;
  desc: string;
  skills: string[];
  project_URL: string;
  duration: string;
}
export interface Preference {
  job_type: string[];
  join_time: string;
  locations: string[];
}
interface Education {
  X?: {
    board_name: string;
    passing_year: string;
    medium: string;
    percentage: string;
  };
  XII?: {
    board_name: string;
    passing_year: string;
    medium: string;
    percentage: string;
  };
  graduation?: {
    course_name: string;
    college_name: string;
    university: string;
    percentage: string;
    cgpa: string;
    start_year: string;
    end_year: string;
  };
  postgraduation?: {
    course_name: string;
    college_name: string;
    university: string;
    percentage: string;
    cgpa: string;
    start_year: string;
    end_year: string;
  };
  doctorate?: {
    course_name: string;
    college_name: string;
    university: string;
    percentage: string;
    cgpa: string;
    start_year: string;
    end_year: string;
  };
}

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
