const UserModel = require("../models/UserModel");
class UserController {
  async get(req, res) {
    const user = await UserModel.get(req.userId);
    return res.send(user);
  }
}

module.exports = new UserController();
