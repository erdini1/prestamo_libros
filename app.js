import express from "express"
import "dotenv/config"

import indexRouter from "./src/routes/index.route.js"
import { db } from "./src/db/index.db.js";
import { error, info } from "./src/log/logger.js";
import { HTTP_STATUSES } from "./src/constants/http.js";
import ApiError from "./src/errors/api.error.js";

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

app.use((req, res, next) => {
    error(JSON.stringify({ status: HTTP_STATUSES.NOT_FOUND, message: `The requested resource ${req.originalUrl} was not found` }));
    res.status(HTTP_STATUSES.NOT_FOUND).json({ status: HTTP_STATUSES.NOT_FOUND, message: "The requested resource was not found" });
});

app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        error(JSON.stringify({ status: err.statusCode, message: err.message }));
        res.status(err.statusCode).json({ status: err.statusCode, error: err.message });
    } else {
        error(JSON.stringify({ status: HTTP_STATUSES.INTERNAL_SERVER_ERROR, message: err.message }));
        res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR).json({ status: HTTP_STATUSES.INTERNAL_SERVER_ERROR, error: err.message });
    }
});