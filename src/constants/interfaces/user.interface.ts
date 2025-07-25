import { ObjectId } from "mongoose";

export interface User {
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

export interface Jobseeker_details {
  User_id: ObjectId;
  education: Education;
  languages: string[];
  skills: string[];
  summary:string;
  internship:InternShip;
  preference:Preference;
}
export interface InternShip{
  project_name:string;
  company_name:string;
  desc:string;
  skills:string[];
  project_URL:string;
  duration:string;
}
export interface Preference{
  job_type:string[];
  join_time:string;
  locations:string[];
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
