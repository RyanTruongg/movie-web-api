const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    strict: false,
    versionKey: false,
    bufferCommands: false,
    validateBeforeSave: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("movie", movieSchema, "movie");
