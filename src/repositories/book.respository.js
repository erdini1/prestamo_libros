import { db } from "../db/index.db.js"

const getAllBooks = async () => {
    return await db.Book.findAll()
}

const createBook = async (title, author, genre, pages, summary) => {
    return await db.Book.create({
        title,
        author,
        genre,
        pages,
        summary
    })
}

const updateBook = async (title, author, genre, pages, summary, id) => {
    return await db.Book.update({
        title,
        author,
        genre,
        pages,
        summary,
    }, { where: { id } })
}

const deleteBook = async id => {
    return await db.Book.destroy({
        where: {
            id
        }
    })
}

export const BookRepository = {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook
}