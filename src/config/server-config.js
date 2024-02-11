const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  TOKEN_EXPIRATION_TIME: process.env.TOKEN_EXPIRATION_TIME,
};
