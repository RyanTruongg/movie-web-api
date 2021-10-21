const controller = require("../../controllers/auth-controller");
const schema = require("../schemas/auth-schema");

module.exports = () => {
  return [
    {
      method: "POST",
      url: "/login",
      schema: schema.login,
      handler: controller.login,
    },
  ];
};
