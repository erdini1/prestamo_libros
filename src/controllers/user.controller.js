import { HTTP_STATUSES } from "../constants/http.js"
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
        return res.status(HTTP_STATUSES.OK).json({ msg: "Usuario creado correctamente" })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const token = await UserService.login(email, password)
    try {
        res.status(HTTP_STATUSES.OK).json({ JWT: token, info: { email } });
    } catch (error) {
        next(error)
    }
}

export const UserController = {
    getAll,
    createUser,
    login
}
