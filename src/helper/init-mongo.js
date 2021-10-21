const movieModel = require("../models/movie-model");

movieModel.insertMany(
  [{ name: "Soul" }, { name: "Star war" }, { name: "Naruto" }],
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Movie init-ed");
  }
);
