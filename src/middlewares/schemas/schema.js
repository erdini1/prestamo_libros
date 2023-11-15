import Joi from "@hapi/joi"
import { ROLES, STATUS } from "../../constants/models.js"

// TODO: Colocar mensajes
export const Schemas = {
    //User
    Id: Joi.string().min(35).max(36).required(),
    String: Joi.string().min(2).max(30).required(),
    Email: Joi.string().min(2).max(30).required().email(),
    Password: Joi.string().min(8).max(16).required(),
    Role: Joi.string().valid(...Object.values(ROLES)).required(),
    // Book
    Pages: Joi.number().integer().min(100).max(2000).required(),
    Status: Joi.string().valid(...Object.values(STATUS)).required(),
    // Loan
    BorrowDate: Joi.date().required(),    //TODO: Agregar iso, ver bien
    ReturnDate: Joi.date().required(),
}
