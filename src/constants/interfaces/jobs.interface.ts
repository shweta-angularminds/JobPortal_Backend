import { ObjectId } from "mongoose";
export interface JobDescription {
  keyResponsibilities?: string[]; 
  descriptionInfo?: string[]; 
  benefits?: string[]; 
  selectionProcess?: string[]; 
}
export interface Job {
  designation: string;
  location: string;
  experience: string;
  positions: number;
  workType: string;
  salary: string;
  qualifications: string[];
  skills: string[];
  employementType: string;
  industry: string;
  department: string;
  desc?: string;
  employer_id: ObjectId;
}
 
  