import { HTTP_STATUSES } from "../constants/http.js";
import { BookService } from "../services/book.service.js";

const getAllBooks = async (req, res, next) => {
  try {
    const data = await BookService.getAllBooks();
    res.status(HTTP_STATUSES.OK).json(data);
  } catch (error) {
    next(error);
  }
};

const createBook = async (req, res, next) => {
  try {
    await BookService.createBook(req.body);
    return res
      .status(HTTP_STATUSES.CREATED)
      .json({ msg: "Book created successfully" });
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    await BookService.updateBook(req.body, req.params.id);
    return res
      .status(HTTP_STATUSES.OK)
      .json({ msg: "Book modified successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    await BookService.deleteBook(req.params.id);
    res.status(HTTP_STATUSES.OK).json({ msg: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const BookController = {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
};
