import mongoose, { Document, Schema } from "mongoose";
import { User } from "../constants/interfaces/user.interface";

const userSchema: Schema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    fresher: {
      type: Boolean,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
    bdate: {
      type: Date,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    profilePic: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
