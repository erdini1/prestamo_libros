import { HTTP_STATUSES } from "../constants/http.js";
import { schemaBook } from "./schemas/book.schema.js";

//VALIDACIONES DE LOS SCHEMAS
const validateCreateBook = (req, res, next) => {
    const { error } = schemaBook.create.validate(req.body, { abortEarly: false })
    if (error) {
        const errorMessages = {}
        error.details.forEach(detail => {
            errorMessages[detail.context.key] = detail.message;
        });
        res.status(HTTP_STATUSES.UNPROCESSABLE_ENTITY).json({ messages: errorMessages })
    } else {
        next()
    }
}

const validateUpdateBook = (req, res, next) => {
    const { error } = schemaBook.update.validate({ body: req.body, id: req.params.id }, { abortEarly: false })
    if (error) {
        const errorMessages = {}
        error.details.forEach(detail => {
            errorMessages[detail.context.key] = detail.message;
        });
        res.status(HTTP_STATUSES.UNPROCESSABLE_ENTITY).json({ messages: errorMessages })
    } else {
        next()
    }
}

export const BookMiddleware = {
    validateCreateBook,
    validateUpdateBook
}