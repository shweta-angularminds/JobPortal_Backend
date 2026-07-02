import { ObjectId } from "mongoose";

export interface Application {
  job_Id: ObjectId;
  user_Id: ObjectId;
  status: string;
  createdAt: Date; 
  updatedAt: Date;
}
export interface ApplicationResponse {
  application_id: ObjectId;
  job_id: ObjectId;
  designation: string | null;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  company_name: string | null;
}
export type GetAllApplicationsInput = {
  userId: string;
  page: number;
  limit: number;
  search?: string;
  status?: string;
};
export type GetAllApplicationsResponse = {
  data: ApplicationResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};