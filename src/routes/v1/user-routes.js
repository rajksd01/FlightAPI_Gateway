const express = require("express");
const { AuthRequestMiddlewares } = require("../../middlewares");
const router = express.Router();
const { UserController } = require("../../controllers");



router.post(
  "/signup",
  AuthRequestMiddlewares.validateAuthRequest,
  UserController.createUser
);
router.post(
  "/signin",
  AuthRequestMiddlewares.validateAuthRequest,
  UserController.signIn
);
router.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = router;
