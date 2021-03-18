const FutureModel = require("../models/FutureModel");
const HistoricModel = require("../models/HistoricModel");
const LikeModel = require("../models/LikeModel");

const AlterMovieQueue = async ({ message, data, channel }) => {
  const { id, props } = data;

  await FutureModel.updateMovie(id, props);
  await HistoricModel.updateMovie(id, props);
  await LikeModel.updateMovie(id, props);

  channel.ack(message);
};

module.exports = AlterMovieQueue;
