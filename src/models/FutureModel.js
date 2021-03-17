const db = require("../services/DatabaseService");

class FutureModel {
  async add({ userId, movieId, movieName, movieDetail }) {
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

  async remove({ userId, movieId }) {
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
}

module.exports = new FutureModel();
