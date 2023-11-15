import Joi from "@hapi/joi"
import { ROLES, STATUS } from "../../constants/models.js"

const messageId = {
    "any.string": "For editing, the ID is required",
    "string.min": "Should have at least 35 characters",
    "string.max": "Exceeded the maximum of 36 characters"
}

const messageString = {
    "any.string": "This field is required",
    "string.min": "Should have at least 2 characters",
    "string.max": "Exceeded the maximum of 30 characters"
}

const messageEmail = {
    "any.string": "The email field is required",
    "string.email": "The email must be valid",
    "string.min": "The email field should have at least 2 characters",
    "string.max": "The email field should have at most 30 characters"
}

const messagePassword = {
    "any.string": "The password field is required",
    "string.max": "The password field should have at least 16 characters"
}

const messageRole = {
    "any.string": "This field is required",
    "string.min": "You must select a valid role"
}

const messagePages = {
    "any.number": "This field is required",
    "number.integer": "The pages field should be an integer",
    "number.min": "The pages field should be at least 100",
    "number.max": "The pages field should be at least 2000"
}

const messageBorrowDate = {
    "any.required": "The borrow date field is required",
    "date.base": "Invalid date format for borrow date"
}

const messageReturnDate = {
    "any.required": "The return date field is required",
    "date.base": "Invalid date format for return date"
}

export const Schemas = {
    //User
    Id: Joi.string().min(35).max(36).required().messages(messageId),
    String: Joi.string().min(2).max(30).required().messages(messageString),
    Email: Joi.string().min(2).max(30).required().email().messages(messageEmail),
    Password: Joi.string().min(8).max(16).required().messages(messagePassword),
    Role: Joi.string().valid(...Object.values(ROLES)).required().messages(messageRole),
    //UpdateUser
    StringUpdate: Joi.string().min(2).max(30).messages(messageString),
    EmailUpdate: Joi.string().min(2).max(30).email().messages(messageEmail),
    PasswordUpdate: Joi.string().min(8).max(16).messages(messagePassword),
    // Book
    Pages: Joi.number().integer().min(100).max(2000).required().messages(messagePages),
    Status: Joi.string().valid(...Object.values(STATUS)).required(), //Ver si va
    // Loan
    BorrowDate: Joi.date().required().messages(messageBorrowDate),    //TODO: Agregar iso, ver bien
    ReturnDate: Joi.date().required().messages(messageReturnDate),
}
