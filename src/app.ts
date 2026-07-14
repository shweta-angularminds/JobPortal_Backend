import dotenv from "dotenv";

dotenv.config();
import express from "express";
import cors from "cors";
import { dbConnect } from "./configs/database.config";
import employerRouter from "./routers/employer.router";
import jobRouter from "./routers/job.router";

import jobseekerRouter from "./routers/jobseeker.router";
import applicationRouter from "./routers/application.router";
import authRouter from "./routers/auth.router";

import { errorMiddleware } from "./middleware/error.middleware";

dbConnect();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:4200", "https://skillsetworks.netlify.app"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Routes
app.use("/skillset/employers", employerRouter);
app.use("/skillset/jobs", jobRouter);
app.use("/skillset/jobseeker", jobseekerRouter);
app.use("/skillset/application", applicationRouter);
app.use("/skillset/auth", authRouter);

app.use(errorMiddleware);

export default app;
