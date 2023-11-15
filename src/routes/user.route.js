import express from "express"
import { UserController } from "../controllers/user.controller.js"
import { UserMiddleware } from "../middlewares/user.middleware.js"

const router = express.Router()

router.get("", UserController.getAll)
router.post("", UserMiddleware.validateCreateUser, UserController.createUser)
router.post("/login", UserMiddleware.validateLogin, UserController.login)
router.put("/:id", UserMiddleware.validateUpdateUser, UserController.modifyUser)


export default router