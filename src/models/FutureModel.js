const db = require("../services/DatabaseService");

class FutureModel {
  async add({ userId, movieId, movieName, movieDetail, moviePoster }) {
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
        movie_detail,
        movie_poster
      ) values (
        $1,
        $2,
        $3,
        $4,
        $5
      )`,
      [userId, movieId, movieName, movieDetail, moviePoster]
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

  async list(userId) {
    const response = await db.execute(
      `select movie_id as id, movie_name as name, movie_detail as detail, movie_poster as poster from future where user_id = $1`,
      [userId]
    );

    return response.rows;
  }

  async updateMovie(movieId, props) {
    const { name, detail } = props;

    await db.execute(
      `update future set movie_name = $1, movie_detail=$2 where movie_id = $3`,
      [name, detail, movieId]
    );
  }
}

module.exports = new FutureModel();
