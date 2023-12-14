import express from "express";
import { UserController } from "../controllers/user.controller.js";
import { UserMiddleware } from "../middlewares/user.middleware.js";
import nodemailer from "nodemailer"; /* sacar */

const router = express.Router();

router.get("", UserController.getAll);
router.post("", UserMiddleware.validateCreateUser, UserController.createUser);
router.get("/:id", UserMiddleware.validateIdUser, UserController.findOneUser);
router.put(
  "/:id",
  UserMiddleware.validateUpdateUser,
  UserController.modifyUser
);
router.post("/login", UserMiddleware.validateLogin, UserController.login);

router.get("/email/test", (req, res) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS
    },
  });


});

export default router;
