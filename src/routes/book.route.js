import express from "express"
import { BookController } from "../controllers/book.controller.js"
import { BookMiddleware } from "../middlewares/book.middleware.js"
const router = express.Router()

router.get("", BookController.getAllBooks)
router.post("", BookMiddleware.validateCreateBook, BookController.createBook)
router.put("/:id", BookMiddleware.validateUpdateBook, BookController.updateBook)

export default router