const db = require("../services/DatabaseService");

class HistoricModel {
  async list(userId) {
    await db.execute(
      `select   movie_id, 
                movie_name, 
                movie_detail 
      from      historics
      where     user_id = $1 
      order by  movie_name`,
      [userId]
    );
  }
  async add({ userId, movieId, movieName, movieDetail }) {
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
        $4,
        $5
      )`,
      [userId, movieId, movieName, movieDetail, new Date()]
    );
  }
}

module.exports = new HistoricModel();
