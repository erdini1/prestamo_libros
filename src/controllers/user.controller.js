import { HTTP_STATUSES } from "../constants/http.js"

const getAll = (req, res, next) => {
    try {
        res.status(HTTP_STATUSES.OK).json("From getAll")
    } catch (error) {
        next(error)
    }
}

export const UserController = {
    getAll
}
