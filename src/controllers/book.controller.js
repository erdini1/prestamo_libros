import { HTTP_STATUSES } from "../constants/http.js"
import { BookService } from "../services/book.service.js"

const getAllBooks = async (req, res, next) => {
    try {
        const data = await BookService.getAllBooks()
        res.status(HTTP_STATUSES.OK).json(data)
    } catch (error) {
        next(error)
    }
}

export const BookController = {
    getAllBooks
}