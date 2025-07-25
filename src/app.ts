
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";


import employerRouter from "./routers/employer.router";
import jobRouter from "./routers/job.router";
import userRouter from "./routers/user.router";
import jobseekerRouter from "./routers/jobseekerDetails.router";
import applicationRouter from "./routers/application.router";
import authRouter from "./routers/auth.router";
import downloadRouter from "./routers/download.router";
import { dbConnect } from "./configs/database.config";


dotenv.config();

dbConnect();


const app = express();


app.use("/uploads", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use(express.json());

const corsOptions = {
  origin: "http://localhost:4200",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Routes
app.use("/download", downloadRouter);
app.use("/skillset/employers", employerRouter);
app.use("/skillset/employers/jobs", jobRouter);
app.use("/skillset/user", userRouter);
app.use("/skillset/jobseeker", jobseekerRouter);
app.use("/skillset/application", applicationRouter);
app.use("/skillset/auth", authRouter);

export default app;
