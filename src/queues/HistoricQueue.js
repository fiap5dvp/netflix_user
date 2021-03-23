const HistoricModel = require("../models/HistoricModel");

const HistoricQueue = async ({ message, data, channel }) => {
  const { userId, movieId, movieName, movieDetail, moviePoster } = data;

  await HistoricModel.add({
    userId,
    movieId,
    movieName,
    movieDetail,
    moviePoster,
  });

  channel.ack(message);
};

module.exports = HistoricQueue;
