const userModel = require("../models/user-model");
const Repository = require("../models/data-access/repository");
const { hash } = require("../helper/hash");

const createOne = async (data) => {
  try {
    const isValidUsername = await userModel.checkValidUsername(data.username);

    if (isValidUsername) {
      const { password } = data;
      const hashed_password = await hash(password);
      data.hashed_password = hashed_password;

      const repository = new Repository(userModel);
      return repository.createOne(data);
    } else {
      throw new Error("Invalid username");
    }
  } catch (error) {
    return error;
  }
};

const findOne = async (whereClause, projection = {}) => {
  const repository = new Repository(userModel);
  return repository.findOne({ ...whereClause }, projection);
};

const findOneWithHash = async (whereClause, projection = {}) => {
  const repository = new Repository(userModel);
  return repository.findOne({ ...whereClause }, "hashed_password");
};

module.exports = { createOne, findOne, findOneWithHash };
