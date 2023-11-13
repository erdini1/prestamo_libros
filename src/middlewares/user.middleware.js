import { HTTP_STATUSES } from "../constants/http.js"
import { UserRepository } from "../repositories/user.repository.js"
import { PasswordUtil } from "../utils/password.utils.js"


const validateUserCredentials = async (req, res, next) => {
    const { email, password } = req.body
    const user = UserRepository.getUserByEmail(email)
    if (!user) throw new ApiError(401, "Invalid Credentials")
    const isPasswordValid = await PasswordUtil.comparePasswords(password, user.password);
    if (isPasswordValid) return user
    next()
}

export const UserMiddleware = {
    validateUserCredentials
}