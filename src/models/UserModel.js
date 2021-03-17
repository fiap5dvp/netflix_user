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

  async markToSeeFuture({ userId, movieId, movieName, movieDetail }) {
    const hasExists = await db.execute(
      `select * from future where user_id = $1 and movie_id = $2`,
      [userId, movieId]
    );

    if (hasExists.rowCount > 0)
      throw {
        status: 400,
        message: "Filme já está na lista para ver mais tarde",
      };

    await db.execute(
      `insert into future (
        user_id, 
        movie_id,
        movie_name,
        movie_detail
      ) values (
        $1,
        $2,
        $3,
        $4
      )`,
      [userId, movieId, movieName, movieDetail]
    );
  }

  async unmarkToSeeFuture({ userId, movieId }) {
    const futureMovie = await db.execute(
      `select * from future where user_id = $1 and movie_id = $2`,
      [userId, movieId]
    );

    if (futureMovie.rowCount <= 0)
      throw {
        status: 400,
        message: "Filme não está na lista",
      };

    const id = futureMovie.rows[0].id;

    await db.execute(`delete from future where id = $1`, [id]);
  }

  async likeMovie({ userId, movieId, movieName, movieDetail }) {
    const hasExists = await db.execute(
      `select * from likes where user_id = $1 and movie_id = $2`,
      [userId, movieId]
    );

    if (hasExists.rowCount > 0)
      throw {
        status: 400,
        message: "Filme já está na lista dos curtidos",
      };

    await db.execute(
      `insert into likes (
        user_id, 
        movie_id,
        movie_name,
        movie_detail
      ) values (
        $1,
        $2,
        $3,
        $4
      )`,
      [userId, movieId, movieName, movieDetail]
    );
  }

  async unLikeMovie({ userId, movieId }) {
    const likeMovie = await db.execute(
      `select id from likes where user_id = $1 and movie_id = $2`,
      [userId, movieId]
    );

    if (likeMovie.rowCount <= 0)
      throw {
        status: 400,
        message: "Filme não está na lista dos curtidos",
      };

    const id = likeMovie.rows[0].id;

    await db.execute(`delete from likes where id = $1`, [id]);
  }

  async addHistory({ userId, movieId, movieName, movieDetail }) {
    await db.execute(
      `insert into historics (
        user_id, 
        movie_id,
        movie_name,
        movie_detail,
        view_date
      ) values (
        $1,
        $2,
        $3,
        $4
      )`,
      [userId, movieId, movieName, movieDetail, new Date()]
    );
  }
}

module.exports = new UserModel();
