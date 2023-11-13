import { db } from "../db/index.db.js"

const getAllUser = async () => {
    return await db.User.findAll()
}

const createUser = async (user) => {
    return await db.User.create(user)
}

const getUserByEmail = async (email) => {
    const response = await db.User.findOne(
        { where: { email } });
    return response.dataValues;
}

export const UserRepository = {
    getAllUser,
    createUser,
    getUserByEmail
}