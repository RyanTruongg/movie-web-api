const HttpStatus = require("http-status-codes");

const errorSchema = require("./common/error-schema");
const notFoundSchema = require("./common/not-found-schema");

const userCreateSchema = {
  type: "object",
  required: ["username", "password", "full_name"],
  properties: {
    username: { type: "string" },
    password: { type: "string" },
    full_name: { type: "string" },
  },
};

module.exports = {
  createOne: {
    body: userCreateSchema,
  },
  findById: {
    params: {
      type: "object",
      required: ["_id"],
      properties: {
        _id: { type: "string", description: "User id" },
      },
    },
  },
  updateFollowedMovies: {
    params: {
      type: "object",
      required: ["_id"],
      properties: {
        _id: { type: "string", description: "User id" },
      },
    },
    body: {
      type: "object",
      required: ["movie_id"],
      properties: {
        movie_id: { type: "string", description: "Movie id" },
      },
    },
  },
};
