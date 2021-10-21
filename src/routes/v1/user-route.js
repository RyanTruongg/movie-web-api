const controller = require("../../controllers/user-controller");
const schema = require("../schemas/user-schema");

module.exports = () => {
  return [
    {
      method: "POST",
      url: "/users",
      schema: schema.createOne,
      handler: controller.createOne,
    },

    {
      method: "GET",
      url: "/users/me",
      // schema: schema.createOne,
      handler: controller.findMe,
      privateRoute: true,
    },
  ];
};
