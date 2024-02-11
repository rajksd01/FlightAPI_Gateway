const { UserRepository } = require("../repositories");
const AppError = require("../utils/errors/app-errors");
const { StatusCodes } = require("http-status-codes");
const { Auth } = require("../utils/common");

const userRepository = new UserRepository();

async function create(data) {
  try {
    const user = await userRepository.create(data);

    return user;
  } catch (error) {
    console.log(error);
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a user object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function signIn(data) {
  try {
    const user = await userRepository.getUserByEmail(data.email);
    if (!user) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }
    const passwordMatch = await Auth.checkPassword(
      data.password,
      user.password
    );
    console.log(passwordMatch);
    if (!passwordMatch) {
      throw new AppError("Password didnot match", StatusCodes.BAD_REQUEST);
    }
    const jwt = Auth.createToken({ id: user.id, email: user.email });
    return jwt;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Not Accessible ", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function isAuthenticated(token) {
  try {
    if (!token) {
      throw new AppError("Token not found", StatusCodes.NOT_FOUND);
    }
    const response = await Auth.verifyToken(token);
    console.log("response",response);
    const user = await userRepository.get(response.id);
    if (!user) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }
    return user.id;
  } catch (error) {
    if (error instanceof AppError) throw error;
    if (error.name == "JsonWebTokenError") {
      throw new AppError("Invalid JWT Token", StatusCodes.BAD_REQUEST);
    }

    throw new AppError("Invalid Details", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  create,
  signIn,
  isAuthenticated,
};
