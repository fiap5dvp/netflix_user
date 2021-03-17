const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const db = require("../services/DatabaseService");

class UserModel {
  async isValidPassword(name, password) {
    const response = await db.execute(
      "Select id from users where name = $1 and password = $2",
      [name, password]
    );

    const userExists = response.rows.length > 0;
    return userExists;
  }

  async getByName(name) {
    const response = await db.execute("Select * from users where name = $1", [
      name,
    ]);

    if (response.rows.length <= 0)
      throw {
        message: "Não foi possível gerar o token. Usuário não encontrado",
        status: 401,
      };

    const user = response.rows[0];

    return user;
  }

  async get(id) {
    const response = await db.execute(
      "Select id, name from users where id = $1",
      [id]
    );

    if (response.rows.length <= 0)
      throw {
        message: "Usuário não encontrado",
        status: 401,
      };

    const user = response.rows[0];

    return user;
  }

  async generateToken(name) {
    const user = await this.getByName(name);
    const token = jwt.sign({ id: user.id }, process.env.KEY, {
      expiresIn: "1d",
    });

    return token;
  }

  async decodeToken(token) {
    try {
      const decoded = await promisify(jwt.verify)(token, process.env.KEY);
      return decoded;
    } catch {
      throw {
        message: "Token inválido",
        status: 401,
      };
    }
  }

  async isValidId(id) {
    const response = await db.execute("Select * from users where id = $1", [
      id,
    ]);

    const isUserExists = response.rows.length >= 0;
    return isUserExists;
  }

  async isValidToken(token) {
    try {
      const decoded = await promisify(jwt.verify)(token, process.env.KEY);

      const isValidId = await this.isValidId(decoded.id);

      return isValidId;
    } catch (error) {
      return false;
    }
  }
}

module.exports = new UserModel();
