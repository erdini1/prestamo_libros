import jwt from "jsonwebtoken"
import { UserRepository } from "../repositories/user.repository.js"
import { PasswordUtil } from "../utils/password.utils.js"

const getAllUser = async () => {
    return await UserRepository.getAllUser()
}

const createUser = async (user) => {
    const { name, lastName, email, password } = user
    const hashedPassword = await PasswordUtil.hashPassword(password)
    return await UserRepository.createUser({
        name,
        lastName,
        email,
        password: hashedPassword
    })
}

const findUserByEmailAndPassword = async (email, password) => {
    const user = await UserRepository.getUserByEmail(email);
    if (!user) throw new ApiError(400, "Invalid Credentials")
    const isPasswordValid = await PasswordUtil.comparePasswords(password, user.password);
    if (isPasswordValid) return user
}

const login = async (email, password) => {
    try {
        const data = await findUserByEmailAndPassword(email, password);
        if (!data) throw new ApiError(500, "No se encontro nada en la DB");
        if (!data.isActive) throw new ApiError(401, "Confirmá tu cuenta para seguir");
        const token = jwt.sign(data, process.env.JWT_KEY/* , { expiresIn: "1h" } */);
        return token;
    } catch (error) {
        throw error
    }
}

export const UserService = {
    getAllUser,
    createUser,
    login
}