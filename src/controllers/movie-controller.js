const movieService = require("../services/movie-service");

const findAll = async (request, reply) => {
  const documents = await movieService.findAll();
  reply.send(documents);
};

module.exports = {
  findAll,
};
