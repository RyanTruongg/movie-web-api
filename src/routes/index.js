const fs = require("fs");
const path = require("path");
const { guardMiddleware } = require("../middlewares/guard-middleware");
const jwt = require("jsonwebtoken");

/**
 *
 * @param fastify
 * @param opts
 * @param next
 */
const verifyMiddleware = async (res, rep) => {
  const token = res.headers["authorization"]?.split(" ")[1];
  if (token) {
    try {
      const root = process.cwd();
      const privateKey = fs.readFileSync(root + "/private.key", "utf8");

      const decoded = jwt.verify(token, privateKey);
      res.decoded_user = decoded;
    } catch (err) {
      rep.send({ error: "Invalid Token" });
    }
  } else {
    rep.send({ error: "Invalid Token" });
  }
};

const addVerifyMiddleware = (fastify, opts, next) => {
  fastify.decorateRequest("decoded_user", {});

  fastify.addHook("preHandler", verifyMiddleware);

  fastify.route(opts.route);
  next();
};

const v1RoutesMiddleware = (fastify, opts, next) => {
  const directory = path.join(__dirname, "v1");

  // middlewares
  fastify.use(guardMiddleware);

  fs.readdirSync(directory).forEach((file) => {
    const routePath = path.join(directory, file);
    const routes = require(routePath)(fastify);
    routes.forEach((route) => {
      if (route.privateRoute) {
        fastify.register(addVerifyMiddleware, { route: route });
      }
      fastify.route(route);
    });
  });

  next();
};

module.exports = { v1RoutesMiddleware };
