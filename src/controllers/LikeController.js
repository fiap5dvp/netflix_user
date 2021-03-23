const LikeModel = require("../models/LikeModel");

class LikeController {
  async list(req, res) {
    const movies = await LikeModel.list(req.userId);
    return res.send(movies);
  }

  async store(req, res) {
    const { userId, movie } = req;

    await LikeModel.add({
      userId,
      movieId: movie.id,
      movieDetail: movie.detail,
      movieName: movie.name,
      moviePoster: movie.poster,
    });

    return res.sendStatus(204);
  }

  async delete(req, res) {
    const { userId, movie } = req;

    await LikeModel.remove({
      userId,
      movieId: movie.id,
    });

    return res.sendStatus(204);
  }
}

module.exports = new LikeController();
