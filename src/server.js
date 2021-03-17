require("express-async-errors");
const express = require("express");
const cors = require("cors");
const TreatExceptionMiddleware = require("./middlewares/TreatExceptionMiddleware");

const routes = require("./routes");

class Server {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(express.json({ limit: "50mb" }));
    this.server.use(express.urlencoded({ limit: "50mb", extended: true }));
  }

  routes() {
    this.server.get("/status", (req, res) => {
      res.send(`${process.env.SERVICE_NAME} service is running`);
    });
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(TreatExceptionMiddleware);
  }
}
module.exports = new Server().server;
