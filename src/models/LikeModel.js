const db = require("../services/DatabaseService");

class LikeModel {
  async add({ userId, movieId, movieName, movieDetail }) {
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

  async remove({ userId, movieId }) {
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
}

module.exports = new LikeModel();
