const UserModel = require("../models/UserModel");
const CatalogService = require("../services/CatalogService");

class UserController {
  async get(req, res) {
    const user = await UserModel.get(req.userId);
    return res.send(user);
  }

  async future(req, res) {
    const { userId, movie } = req;

    await UserModel.markToSeeFuture({
      userId,
      movieId: movie.id,
      movieName: movie.name,
      movieDetail: movie.detail,
    });

    return res.sendStatus(201);
  }

  async unfuture(req, res) {
    const { userId, movie } = req;

    await UserModel.unmarkToSeeFuture({
      userId,
      movieId: movie.id,
    });

    return res.sendStatus(201);
  }

  async likeMovie(req, res) {
    const { userId, movie } = req;

    await UserModel.likeMovie({
      userId,
      movieId: movie.id,
      movieDetail: movie.detail,
      movieName: movie.name,
    });

    return res.sendStatus(201);
  }

  async unLikeMovie(req, res) {
    const { userId, movie } = req;

    await UserModel.unLikeMovie({
      userId,
      movieId: movie.id,
    });

    return res.sendStatus(201);
  }
}

module.exports = new UserController();
