const movieModel = require("../models/movie-model");

const Repository = require("../models/data-access/repository");

const findAll = async () => {
  const repository = new Repository(movieModel);
  return repository.findAll();
};

module.exports = {
  findAll,
};
