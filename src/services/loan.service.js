import { LoanRepository } from "../repositories/loan.repository.js";

const getAllLoans = async () => {
  try {
    const data = await LoanRepository.getAllLoans();
    return data;
  } catch (error) {
    throw error;
  }
};

const createLoan = async (body) => {
  try {
    const { borrowDate, returnDate, books, userId } = body;
    return LoanRepository.createLoan(borrowDate, returnDate, books, userId);
  } catch (error) {
    throw error;
  }
};

export const LoanService = {
  getAllLoans,
  createLoan,
};
