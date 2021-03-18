const db = require("../services/DatabaseService");

class LikeModel {
  async add({ userId, movieId, movieName, movieDetail }) {
    const hasExists = await db.execute(
      `select * from likes where user_id = $1 and movie_id = $2`,
      [userId, movieId]
    );

    if (hasExists.rowCount === 0) {
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
  }

  async remove({ userId, movieId }) {
    const likeMovie = await db.execute(
      `select id from likes where user_id = $1 and movie_id = $2`,
      [userId, movieId]
    );

    if (likeMovie.rowCount > 0) {
      const id = likeMovie.rows[0].id;

      await db.execute(`delete from likes where id = $1`, [id]);
    }
  }

  async updateMovie(movieId, props) {
    const { name, detail } = props;

    await db.execute(
      `update likes set movie_name = $1, movie_detail=$2 where movie_id = $3`,
      [name, detail, movieId]
    );
  }
}

module.exports = new LikeModel();
