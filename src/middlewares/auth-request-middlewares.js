const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-errors");
const { UserService } = require("../services");

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

async function checkAuth(req, res, next) {
  try {
    const response = await UserService.isAuthenticated(
      req.headers["x-access-token"]
    );
    if (response) {
      req.user = response;
      next();
    }
  } catch (error) {
    ErrorResponse.error = new AppError(
      "Failed to authenticate token",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
    ErrorResponse.message = "Cannot connect to the server";
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = { validateAuthRequest, checkAuth };
