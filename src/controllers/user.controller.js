import { HTTP_STATUSES } from "../constants/http.js"
import ApiError from "../errors/api.error.js"
import { UserService } from "../services/user.service.js"

const getAll = async (req, res, next) => {
    try {
        const data = await UserService.getAllUser()
        return res.status(HTTP_STATUSES.OK).json(data)
    } catch (error) {
        next(error)
    }
}

const createUser = async (req, res, next) => {
    try {
        await UserService.createUser(req.body)
        return res.status(HTTP_STATUSES.OK).json({ msg: "User created successfully" })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const token = await UserService.authentication(req.body)
        res.status(HTTP_STATUSES.OK).json({ JWT: token });
    } catch (error) {
        next(error)
    }
}

const modifyUser = async (req, res, next) => {
    try {
        await UserService.modifyUser(req.body, req.params.id)
        res.status(HTTP_STATUSES.OK).json({ msg: "User modified successfully" })
    } catch (error) {
        next(error)
    }
}

const findOneUser = async (req, res, next) => {
    try {
        const data = await UserService.findOneUser(req.params.id)
        res.status(HTTP_STATUSES.OK).json(data)
    } catch (error) {
        next(error)
    }
}

export const UserController = {
    getAll,
    createUser,
    login,
    modifyUser,
    findOneUser
}
