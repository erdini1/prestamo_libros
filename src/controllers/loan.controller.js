import { HTTP_STATUSES } from "../constants/http.js";
import { LoanService } from "../services/loan.service.js";

const getAllLoans = async (req, res, next) => {
  try {
    const data = await LoanService.getAllLoans();
    return res.status(HTTP_STATUSES.OK).json(data);
  } catch (error) {
    next(error);
  }
};

const createLoan = async (req, res, next) => {
  try {
    await LoanService.createLoan(req.body);
    res
      .status(HTTP_STATUSES.CREATED)
      .json({ msg: "Loan created successfully" });
  } catch (error) {
    next(error);
  }
};

export const LoanController = {
  getAllLoans,
  createLoan,
};
