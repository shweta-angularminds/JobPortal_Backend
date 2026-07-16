import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";

import employerRouter from "./routers/employer.router";
import jobRouter from "./routers/job.router";
import jobseekerRouter from "./routers/jobseeker.router";
import applicationRouter from "./routers/application.router";
import authRouter from "./routers/auth.router";

import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const corsOptions = {
  origin: ["http://localhost:4200", "https://skillsetworks.netlify.app"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(helmet());

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(limiter);

app.use(compression());

app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/skillset/employers", employerRouter);
app.use("/skillset/jobs", jobRouter);
app.use("/skillset/jobseeker", jobseekerRouter);
app.use("/skillset/application", applicationRouter);
app.use("/skillset/auth", authRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use(errorMiddleware);

export default app;
