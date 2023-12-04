import { db } from "../db/index.db.js";

// rEVISAR COMO FUNCIONAN ESTOS DOS - ESTE NO ME FUNCIONA
const getAllLoans = async () => {
  try {
    const loans = await db.Loan.findAll({
      // joinTableAttributes: [],
      include: [
        {
          model: db.Book,
          as: "books",
          through: { attributes: [] }, // Evita que se incluyan los atributos adicionales de la tabla intermedia
        },
        {
          model: db.User,
          as: "owner",
        },
      ],
    });
    return loans;
  } catch (error) {
    throw error;
  }
};

const createLoan = async (borrowDate, returnDate, books, userId) => {
  try {
    const loan = await db.Loan.create({
      borrowDate,
      returnDate,
      userId,
    });
    const bookIds = books.map((book) => book.id);
    const existingBooks = await db.Book.findAll({
      where: {
        id: bookIds,
      },
    });
    if (existingBooks.length !== bookIds.length) {
      throw new Error("One or more books do not exist.");
    }
    await loan.addBooks(bookIds);
    return loan;
  } catch (error) {
    throw error;
  }
};

export const LoanRepository = {
  getAllLoans,
  createLoan,
};
