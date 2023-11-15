import { db } from "../db/index.db.js"

const getAllBooks = async () => {
    return await db.Book.findAll()
}

export const BookRepository = {
    getAllBooks
}