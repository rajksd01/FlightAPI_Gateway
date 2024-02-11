const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-errors");

function validateAuthRequest(req, res, next) {
  if (!req.body.email) {
    ErrorResponse.message = "Something went wrong while authenticating email ";
    ErrorResponse.error = new AppError([
      "Email not found ",
      StatusCodes.BAD_REQUEST,
    ]);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.password) {
    ErrorResponse.message =
      "Something went wrong while authenticating password ";
    ErrorResponse.error = new AppError([
      "Password not found ",
      StatusCodes.BAD_REQUEST,
    ]);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = { validateAuthRequest };
