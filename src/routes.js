const { Router } = require("express");

const AuthMiddleware = require("./middlewares/AuthMiddleware");
const MovieMiddleware = require("./middlewares/MovieMiddleware");

const AuthenticationColler = require("./controllers/AuthenticationController");
const UserController = require("./controllers/UserController");
const HistoricController = require("./controllers/HistoricController");
const LikeController = require("./controllers/LikeController");
const FutureController = require("./controllers/FutureController");

const routes = Router();

routes.post("/api/authenticate", AuthenticationColler.authenticate);
routes.post("/api/validateToken", AuthenticationColler.validateToken);

routes.use("/api", AuthMiddleware);

routes.get("/api/users", UserController.get);
routes.put("/api/users", UserController.update);

routes.get("/api/futures", FutureController.list);
routes.post("/api/futures/:movieId", MovieMiddleware, FutureController.store);
routes.delete(
  "/api/futures/:movieId",
  MovieMiddleware,
  FutureController.delete
);

routes.get("/api/likes", LikeController.list);
routes.post("/api/likes/:movieId", MovieMiddleware, LikeController.store);
routes.delete("/api/likes/:movieId", MovieMiddleware, LikeController.delete);

routes.get("/api/historics", HistoricController.list);

module.exports = routes;
