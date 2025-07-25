import { ObjectId } from "mongoose";

export interface Application {
  job_Id: ObjectId;
  user_Id: ObjectId;
  status: string;
  createdAt: Date; 
  updatedAt: Date;
}
