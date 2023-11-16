import { BookRepository } from "../repositories/book.respository.js"

const getAllBooks = async () => {
    return await BookRepository.getAllBooks()
}

const createBook = async (book) => {
    try {
        const { title, author, genre, pages, summary } = book
        return await BookRepository.createBook(title, author, genre, pages, summary)
    } catch (error) {
        throw error
    }
}

const updateBook = async (book, id) => {
    try {
        const { title, author, genre, pages, summary } = book
        const data = await BookRepository.updateBook(title, author, genre, pages, summary, id)
        if (data[0] == 0) {
            throw new ApiError(HTTP_STATUSES.BAD_REQUEST, "Book not modified")
        }
        return data
    } catch (error) {
        throw error
    }
}

export const BookService = {
    getAllBooks,
    createBook,
    updateBook
}