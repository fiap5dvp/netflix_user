const HistoricModel = require("../models/HistoricModel");

class HistoricController {
  async list(req, res) {
    const { userId } = req;

    const histories = await HistoricModel.list(userId);

    res.send(histories.rows);
  }
}

module.exports = new HistoricController();
