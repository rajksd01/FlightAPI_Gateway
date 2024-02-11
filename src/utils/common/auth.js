const bcrypt = require("bcrypt");
const AppError = require("../errors/app-errors");
const jwt = require("jsonwebtoken");
const {
  JWT_SECRET_KEY,
  TOKEN_EXPIRATION_TIME,
} = require("../../config/server-config");
const { StatusCodes } = require("http-status-codes");

async function checkPassword(plainPassword, encryptedPassword) {
  try {
    return await bcrypt.compareSync(plainPassword, encryptedPassword);
  } catch (error) {
    throw new AppError("Cannot Authenticate", StatusCodes.BAD_REQUEST);
  }
}

async function createToken(input) {
  try {
    const token = await jwt.sign(input, JWT_SECRET_KEY, {
      expiresIn: TOKEN_EXPIRATION_TIME,
    });
    return token;
  } catch (error) {
    throw new AppError("Cannot verify user", StatusCodes.GATEWAY_TIMEOUT);
  }
}

module.exports = {
  checkPassword,
  createToken,
};
