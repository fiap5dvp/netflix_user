const LikeModel = require("../models/LikeModel");

class LikeController {
  async store(req, res) {
    const { userId, movie } = req;

    await LikeModel.add({
      userId,
      movieId: movie.id,
      movieDetail: movie.detail,
      movieName: movie.name,
    });

    return res.sendStatus(201);
  }

  async delete(req, res) {
    const { userId, movie } = req;

    await LikeModel.remove({
      userId,
      movieId: movie.id,
    });

    return res.sendStatus(201);
  }
}

module.exports = new LikeController();
