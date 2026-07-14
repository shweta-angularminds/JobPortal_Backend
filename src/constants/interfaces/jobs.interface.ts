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

export type GetJobsParams = {
  search?: string;
  location?: string;
  experience?: string;
  employementType?: string;
  page: number;
  limit: number;
};

export type CreateJobParams = {
  employer_id: string;
  designation: string;
  location: string;
  experience: string;
  positions: number;
  workType: string;
  salary: number;
  qualifications: string;
  skills: string[];
  employementType: string;
  industry: string;
  department: string;
  desc: string;
};
export type UpdateJobParams = {
  id: string;
  employer_id: string;
  designation: string;
  location: string;
  experience: string;
  positions: number;
  workType: string;
  salary: number;
  qualifications: string;
  skills: string[];
  employementType: string;
  industry: string;
  department: string;
  desc: string;
};

export type GetCandidateDetailsParams = {
  employerId: string;
  jobId: string;
  candidateId: string;
};
