import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository.js";
import { PasswordUtil } from "../utils/password.utils.js";
import ApiError from "../errors/api.error.js";
import { HTTP_STATUSES } from "../constants/http.js";

const getAllUser = async () => {
  return await UserRepository.getAllUser();
};

const createUser = async (user) => {
  const { name, lastName, email, password } = user;
  const hashedPassword = await PasswordUtil.hashPassword(password);
  return await UserRepository.createUser({
    name,
    lastName,
    email,
    password: hashedPassword,
  });
};

const findUserByEmailAndPassword = async (email, password) => {
  try {
    const user = await UserRepository.getUserByEmail(email);
    if (!user)
      throw new ApiError(HTTP_STATUSES.UNAUTHORIZED, "Invalid Credentials");
    const isPasswordValid = await PasswordUtil.comparePasswords(
      password,
      user.password,
    );
    if (!isPasswordValid)
      throw new ApiError(HTTP_STATUSES.UNAUTHORIZED, "Invalid Credentials");
    return user;
  } catch (error) {
    throw error;
  }
};

const authentication = async (body) => {
  try {
    const { email, password } = body;
    const data = await findUserByEmailAndPassword(email, password);
    const token = jwt.sign(
      data, process.env.JWT_KEY /* , { expiresIn: "1h" } */,);
    return token;
  } catch (error) {
    throw error;
  }
};

const modifyUser = async (body, id) => {
  try {
    const { name, lastName, email } = body;
    const data = await UserRepository.modifyUser(name, lastName, email, id);
    if (data[0] == 0) {
      throw new ApiError(HTTP_STATUSES.BAD_REQUEST, "User not modified");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

const findOneUser = async (id) => {
  try {
    const data = await UserRepository.findOneUser(id);
    return data;
  } catch (error) {
    throw error;
  }
};

export const UserService = {
  getAllUser,
  createUser,
  authentication,
  modifyUser,
  findOneUser,
};
