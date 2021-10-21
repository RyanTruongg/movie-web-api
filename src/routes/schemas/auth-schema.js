const HttpStatus = require("http-status-codes");

const errorSchema = require("./common/error-schema");
const notFoundSchema = require("./common/not-found-schema");

const loginBodySchema = {
  type: "object",
  required: ["username", "password"],
  properties: {
    username: { type: "string" },
    password: { type: "string" },
  },
};

module.exports = {
  login: {
    body: loginBodySchema,
  },
};
