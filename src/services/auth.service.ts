import { STATUS_BAD_REQUEST } from "../constants/status/http.status";
import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";
import { AppError } from "../utils/appError";
import { jobseekerRegisterDto } from "../constants/interfaces/user.interface";
import JobSeekerDetailsModel from "../models/jobseeker_details.model";
import { USER_FIELDS_TO_EXCLUDE } from "../constants/user.constants";

export const jobSeekerLoginService = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new AppError("Invalid email or password", STATUS_BAD_REQUEST);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid email or password", STATUS_BAD_REQUEST);
  }
  
  return user;
};

export const jobSeekerRegisterService  = async(
  data:jobseekerRegisterDto
)=>{
  const existingUser = await UserModel.findOne({email:data.email})

  if(existingUser){
    throw new AppError("User already exists", STATUS_BAD_REQUEST)
  }

  const hashedPassword = await bcrypt.hash(
    data.password,
    10
  )

  const user = await UserModel.create({
    username:data.username,
    phone:data.phone,
    email:data.email,
    password:hashedPassword,
    fresher:data.fresher,
    resume:data.resume ?? ""
  })

  await JobSeekerDetailsModel.create({
    User_id:user._id,
  })
  return UserModel.findById(user._id).select(USER_FIELDS_TO_EXCLUDE);
}

