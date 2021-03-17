const CatalogService = require("../services/CatalogService");

module.exports = async (req, res, next) => {
  const { movieId } = req.params;

  const catalogService = new CatalogService(req.token);

  const movie = await catalogService.getMovie(movieId);

  if (!movie) return res.status(400).send("Filme não encontrado");

  req.movie = movie;

  return next();
};
