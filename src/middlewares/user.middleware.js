import { HTTP_STATUSES } from "../constants/http.js";
import ApiError from "../errors/api.error.js";
import { schemaUser } from "./schemas/user.schema.js";

//VALIDACIONES DE LOS SCHEMAS
const validateCreateUser = (req, res, next) => {
    const { error } = schemaUser.create.validate(req.body, { abortEarly: false })
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

const validateLogin = (req, res, next) => {
    const { error } = schemaUser.login.validate(req.body, { abortEarly: false })
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

const validateUpdateUser = (req, res, next) => {
    const { error } = schemaUser.update.validate({ body: req.body, id: req.params.id }, { abortEarly: false })
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

const validateIdUser = (req, res, next) => {
    const { error } = schemaUser.getOne.validate(req.params, { abortEarly: false })
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

//MIDDLEWARES GENERALES DE USUARIOS
// TODO: Aplicar el middleware
const isAuthenticated = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) throw new ApiError(HTTP_STATUSES.UNAUTHORIZED, "Unauthorized access. The required token was not sent.")

    try {
        token = token.split(" ")[1]
        const decode = jwt.verify(token, process.env.JWT_KEY);
        const user = decode;
        if (user.role != "ADMIN" || user.role != "USER") {
            throw new ApiError(HTTP_STATUSES.UNAUTHORIZED, "You are not a user.");
        }
        req.user = user
        next()
    } catch (error) {
        throw error
    }
}

export const UserMiddleware = {
    isAuthenticated,
    validateCreateUser,
    validateLogin,
    validateUpdateUser,
    validateIdUser
}