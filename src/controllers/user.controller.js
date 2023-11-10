import { HTTP_STATUSES } from "../constants/http.js"

const getAll = (req, res, next) => {
    res.status(HTTP_STATUSES.OK).json("From getAll")
}

export const UserController = {
    getAll
}
