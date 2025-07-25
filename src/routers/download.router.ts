import express from "express";
import path from "path";
import fs from "fs";
import {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
} from "../constants/status/http.status";

const router = express.Router();

router.get("/download-resume/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "..", "uploads", "resume", filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(STATUS_NOT_FOUND).send("File not found");
    }

    res.download(filePath, filename, (err) => {
      if (err) {
        res
          .status(STATUS_INTERNAL_SERVER_ERROR)
          .send("Error in downloading file");
      }
    });
  });
});

export default router;
