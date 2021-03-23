const db = require("../services/DatabaseService");

class HistoricModel {
  async list(userId) {
    const response = await db.execute(
      `select   distinct
                movie_id as id, 
                movie_name as name, 
                movie_detail as detail,
                movie_poster as poster
      from      historics
      where     user_id = $1 
      order by  movie_name`,
      [userId]
    );

    return response.rows;
  }
  async add({ userId, movieId, movieName, movieDetail, moviePoster }) {
    await db.execute(
      `insert into historics (
        user_id, 
        movie_id,
        movie_name,
        movie_detail,
        movie_poster,
        view_date
      ) values (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6
      )`,
      [userId, movieId, movieName, movieDetail, moviePoster, new Date()]
    );
  }

  async updateMovie(movieId, props) {
    const { name, detail } = props;

    await db.execute(
      `update historics set movie_name = $1, movie_detail=$2 where movie_id = $3`,
      [name, detail, movieId]
    );
  }
}

module.exports = new HistoricModel();
