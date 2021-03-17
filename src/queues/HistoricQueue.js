const HistoricModel = require("../models/HistoricModel");

const HistoricQueue = async ({ message, data, channel }) => {
  const { userId, movieId, movieName, movieDetail } = data;

  await HistoricModel.add({
    userId,
    movieId,
    movieName,
    movieDetail,
  });

  channel.ack(message);
};

module.exports = HistoricQueue;
