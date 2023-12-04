import express from "express";
const router = express.Router();

import userRouter from "./user.route.js";
import bookRouter from "./book.route.js";
import loanRouter from "./loan.route.js";

router.use("/user", userRouter);
router.use("/book", bookRouter);
router.use("/loan", loanRouter);

export default router;
