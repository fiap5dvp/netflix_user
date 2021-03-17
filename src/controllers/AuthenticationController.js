const UserModel = require("../models/UserModel");

class AuthenticationController {
  async authenticate(req, res) {
    const { name, password } = req.body;

    const isValid = await UserModel.isValidPassword(name, password);

    if (!isValid) return res.status(401).send("Usuário ou senha inválido(s)");

    const token = await UserModel.generateToken(name);

    res.send(token);
  }

  async validateToken(req, res) {
    const { token } = req.body;

    const isValid = await UserModel.isValidToken(token);

    if (!isValid) return res.status(401).send("Token inválido");

    return res.sendStatus(204);
  }
}

module.exports = new AuthenticationController();
