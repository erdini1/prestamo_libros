import { BookRepository } from "../repositories/book.respository.js"

const getAllBooks = async () => {
    return await BookRepository.getAllBooks()
}

export const BookService = {
    getAllBooks
}