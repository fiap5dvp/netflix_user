const FutureModel = require("../models/FutureModel");

class FutureController {
  async store(req, res) {
    const { userId, movie } = req;

    await FutureModel.add({
      userId,
      movieId: movie.id,
      movieName: movie.name,
      movieDetail: movie.detail,
    });

    return res.sendStatus(201);
  }

  async delete(req, res) {
    const { userId, movie } = req;

    await FutureModel.remove({
      userId,
      movieId: movie.id,
    });

    return res.sendStatus(201);
  }

  async list(req, res) {
    const { userId } = req;

    const futures = await FutureModel.list(userId);

    return res.send(futures);
  }
}

module.exports = new FutureController();
