const axios = require("axios");

class CatalogService {
  constructor(token) {
    this.token = token;
  }
  async getMovie(movieId) {
    try {
      const response = await axios({
        url: `${process.env.CATALOG_SERVICE_URL}/api/movies/${movieId}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${this.token}`,
        },
        timeout: 5000,
      });

      return response.data;
    } catch (error) {
      throw {
        service: "Catalog",
        baseUrl: process.env.CATALOG_SERVICE_URL,
        error,
      };
    }
  }
}

module.exports = CatalogService;
