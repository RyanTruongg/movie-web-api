const Boom = require("boom");
const HttpStatus = require("http-status-codes/index");
const userService = require("../services/user-service");

const createOne = async (request, reply) => {
  try {
    const document = await userService.createOne(request.body);
    reply.code(HttpStatus.CREATED).send(document);
  } catch (e) {
    request.log.error(e);
    Boom.boomify(e);
  }
};

const findMe = async (request, reply) => {
  const { _id } = request.decoded_user.data;
  const document = await userService.findOne({ _id });
  reply.send(document);
};

module.exports = {
  createOne,
  findMe,
};
