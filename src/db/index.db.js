import { Sequelize } from "sequelize";
import "dotenv/config";

import User from "../models/user.model.js";
import Book from "../models/book.model.js";
import Loan from "../models/loan.model.js";

let db = {};

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: false,
  },
  query: {
    raw: true,
  },
});

db.sequelize = sequelize;
// db.Sequelize = Sequelize;

db.User = User(sequelize);
db.Book = Book(sequelize);
db.Loan = Loan(sequelize);

db.User.associate(db);
db.Loan.associate(db);

export { db };
