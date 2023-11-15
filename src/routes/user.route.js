import express from "express"
import { UserController } from "../controllers/user.controller.js"
import { UserMiddleware } from "../middlewares/user.middleware.js"

const router = express.Router()

router.get("", UserController.getAll)
router.post("", UserMiddleware.validateCreateUser, UserController.createUser)
router.get("/:id", UserMiddleware.validateIdUser, UserController.findOneUser)
router.put("/:id", UserMiddleware.validateUpdateUser, UserController.modifyUser)
router.post("/login", UserMiddleware.validateLogin, UserController.login)



export default router