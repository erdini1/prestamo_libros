import express from "express";
import { LoanController } from "../controllers/loan.controller.js";
const router = express.Router();

router.get("", LoanController.getAllLoans); //Consultar - Por que no se ponen parentesis aca?
router.post("", LoanController.createLoan);

export default router;
