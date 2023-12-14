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
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "alkemylibrary@gmail.com",
      pass: "ztyv tvij hkda ujsy",
    },
  });

  const message = transporter.sendMail({
    from: "alkemylibrary@gmail.com",
    to: "erdini.dylan@gmail.com",
    subject: "Prueba",
    text: "Esto es una prueba",
  });

  message;
});

export default router;
