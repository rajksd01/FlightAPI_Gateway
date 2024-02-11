const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createUser(req, res) {
  try {
    const user = await UserService.create({
      email: req.body.email,
      password: req.body.password,
    });
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function signIn(req, res) {
  try {
    const user = await UserService.signIn({
      email: req.body.email,
      password: req.body.password,
    });
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
// delete a City

async function deleteUser(req, res) {
  try {
    await UserService.deleteUser(req.params.id);
    SuccessResponse.data = `User with id ${req.params.id} was deleted`;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

// fetch all Cities
async function getAllCities(req, res) {
  try {
    const cities = await CityService.getAllCities();
    SuccessResponse.data = cities;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

// fetch a specific City from id

async function getCity(req, res) {
  try {
    const id = req.params.id;
    const city = await CityService.getCity(id);
    SuccessResponse.data = city;
    return res.status(city.statusCode).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
// to update data of a City
async function updateCity(req, res) {
  try {
    const id = req.params.id;

    const result = await CityService.updateCity(id, req.body);
    console.log(result);
    const updatedCity = await CityService.getCity(id);
    SuccessResponse.data = updatedCity;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.SERVICE_UNAVAILABLE).json(ErrorResponse);
  }
}

module.exports = {
  createUser,
  signIn,
};
