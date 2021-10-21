const controller = require("../../controllers/movie-controller");

module.exports = () => {
  return [
    {
      method: "GET",
      url: "/movies",
      // schema: schema.createOne,
      handler: controller.findAll,
      privateRoute: true,
    },
  ];
};
