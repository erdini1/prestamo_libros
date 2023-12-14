import express from "express";
import "dotenv/config";

import indexRouter from "./src/routes/index.route.js";
import { db } from "./src/db/index.db.js";
import { error, info } from "./src/log/logger.js";
import { HTTP_STATUSES } from "./src/constants/http.js";
import ApiError from "./src/errors/api.error.js";

import http from "http";
import { Server } from "socket.io";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
const swaggerDocs = YAML.load("./src/docs/index.yaml");

try {
  // db.sequelize.authenticate();
  console.log("Connection has been established successfully.");
  // db.sequelize.sync();
  // db.sequelize.sync({ force: true }).then(() => {
  //     console.log("Drop and re-sync db.");
  // });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`Usuario conectado`);
  // console.log(socket);

  socket.on("chat message", (msg) => {
    // console.log(msg);
    console.log(`Mensaje recibido de ${msg.sender}: ${msg.text}`);

    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log(`Usuario desconectado`);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});

app.use(express.json());

// Indico el prefijo de la api
const API_ENDPOINT = process.env.API_ENDPOINT;
app.use(API_ENDPOINT, indexRouter);

var options = {
  explorer: true,
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, options));

app.use((req, res, next) => {
  error(
    JSON.stringify({
      status: HTTP_STATUSES.NOT_FOUND,
      message: `The requested resource ${req.originalUrl} was not found`,
    })
  );
  res.status(HTTP_STATUSES.NOT_FOUND).json({
    status: HTTP_STATUSES.NOT_FOUND,
    message: "The requested resource was not found",
  });
});

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    error(JSON.stringify({ status: err.statusCode, message: err.message }));
    res
      .status(err.statusCode)
      .json({ status: err.statusCode, error: err.message });
  } else {
    error(
      JSON.stringify({
        status: HTTP_STATUSES.INTERNAL_SERVER_ERROR,
        message: err.message,
      })
    );
    res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR).json({
      status: HTTP_STATUSES.INTERNAL_SERVER_ERROR,
      error: err.message,
    });
  }
});
