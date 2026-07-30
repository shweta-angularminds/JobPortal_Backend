import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { dbConnect } from "./configs/database.config";
import { env } from "./configs/env.config";

async function startServer() {
  try {
    await dbConnect();

    app.listen(env.port, () => {
      console.log(`Server running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

startServer();
