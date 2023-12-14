import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";
const router = express.Router();

import userRouter from "./user.route.js";
import bookRouter from "./book.route.js";
import loanRouter from "./loan.route.js";
import { exportToCSVController } from "../controllers/exportcsv.controller.js";

router.use("/user", userRouter);
router.use("/book", bookRouter);
router.use("/loan", loanRouter);

router.use("/chat", (req, res) => {
  const currentModulePath = fileURLToPath(import.meta.url);
  const currentDirPath = dirname(currentModulePath);
  const chatFilePath = path.resolve(currentDirPath, "../public/chat.html");
  res.sendFile(chatFilePath);
});

router.get("/export-csv", exportToCSVController);
router.get("/export-csv/download/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join("src/exports", filename);

  res.download(filePath, (err) => {
    if (err) {
      res.status(500).json({ error: "Archivo expirado" });
    }
  });
});

export default router;
