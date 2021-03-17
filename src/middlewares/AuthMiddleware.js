const UserModel = require("../models/UserModel");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Token não informado",
    });
  }

  const [, token] = authHeader.split(" ");

  if (!token) return res.status(401).send("Token inválido");

  const decoded = await UserModel.decodeToken(token);

  req.token = token;

  req.userId = decoded.id;

  return next();
};
