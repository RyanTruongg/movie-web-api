const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    full_name: String,
    username: String,
    hashed_password: { type: String, select: false },
    followed_movies: { type: [String], default: [] },
  },
  {
    strict: false,
    versionKey: false,
    bufferCommands: false,
    validateBeforeSave: false,
    timestamps: true,
  }
);

userSchema.statics.checkValidUsername = async function (name) {
  const doc = await this.findOne({ username: name });

  return doc ? false : true;
};

module.exports = mongoose.model("user", userSchema, "user");
