const { Router } = require("express");

const AuthMiddleware = require("./middlewares/AuthMiddleware");
const MovieMiddleware = require("./middlewares/MovieMiddleware");

const AuthenticationColler = require("./controllers/AuthenticationController");
const UserController = require("./controllers/UserController");

const routes = Router();

routes.post("/api/authenticate", AuthenticationColler.authenticate);
routes.post("/api/validateToken", AuthenticationColler.validateToken);

routes.use("/api", AuthMiddleware);

routes.get("/api/user", UserController.get);
routes.post("/api/future/:movieId", MovieMiddleware, UserController.future);
routes.delete("/api/future/:movieId", MovieMiddleware, UserController.unfuture);
routes.post("/api/like/:movieId", MovieMiddleware, UserController.likeMovie);
routes.delete(
  "/api/like/:movieId",
  MovieMiddleware,
  UserController.unLikeMovie
);

module.exports = routes;
