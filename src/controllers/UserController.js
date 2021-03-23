const UserModel = require("../models/UserModel");
class UserController {
  async get(req, res) {
    const user = await UserModel.get(req.userId);

    return res.send(user);
  }

  async update(req, res) {
    const { name } = req.body;

    await UserModel.update(req.userId, { name });

    return res.sendStatus(204);
  }
}

module.exports = new UserController();
