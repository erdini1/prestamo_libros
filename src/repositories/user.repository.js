import { db } from "../db/index.db.js";

const getAllUser = async () => {
  return await db.User.findAll();
};

const createUser = async (user) => {
  return await db.User.create(user);
};

const getUserByEmail = async (email) => {
  return await db.User.findOne({ where: { email } });
};

const modifyUser = async (name, lastName, email, id) => {
  return await db.User.update({ name, lastName, email }, { where: { id } });
};

const findOneUser = async (id) => {
  return await db.User.findOne({ where: { id } });
};

export const UserRepository = {
  getAllUser,
  createUser,
  getUserByEmail,
  modifyUser,
  findOneUser,
};
