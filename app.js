import express from "express"
import "dotenv/config"

import indexRouter from "./src/routes/index.route.js"
import { db } from "./src/db/index.db.js";
import { info } from "./src/log/logger.js";

try {
    // db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
    // db.sequelize.sync();
    // db.sequelize.sync({ force: true }).then(() => {
    //     console.log("Drop and re-sync db.");
    // });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const app = express()
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    info(`Server running on port ${PORT}`)
})

app.use(express.json())

// Indico el prefijo de la api
const API_ENDPOINT = process.env.API_ENDPOINT
app.use(API_ENDPOINT, indexRouter)