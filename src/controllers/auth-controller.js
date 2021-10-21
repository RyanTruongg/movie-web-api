const fs = require("fs");
const jwt = require("jsonwebtoken");
const Boom = require("boom");
const HttpStatus = require("http-status-codes/index");
const { verify } = require("../helper/hash");
const userService = require("../services/user-service");
/**
 *
 * @param request
 * @param reply
 */
const login = async (request, reply) => {
  try {
    const { username, password } = request.body;

    const doc = await userService.findOneWithHash({ username: username });
    const hash = doc.hashed_password;
    delete doc.hashed_password;

    const key = await verify(password, hash);

    if (key) {
      try {
        const data = { _id: doc._id };
        const root = process.cwd();
        const privateKey = fs.readFileSync(root + "/private.key", "utf8");
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: data,
          },
          privateKey
        );

        reply.code(HttpStatus.OK).send({ token });
      } catch (e) {
        request.log.error(e);
        return Boom.boomify(e);
      }
    } else {
      const e = new Error("Wrong password");
      request.log.error(e);
      return Boom.boomify(e);
    }
  } catch (e) {
    request.log.error(e);
    return Boom.boomify(e);
  }
};

module.exports = { login };
