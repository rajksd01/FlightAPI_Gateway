const express = require("express");
const { infoController } = require("../../controllers");
const userRoutes = require("./user-routes");
const { AuthRequestMiddlewares } = require("../../middlewares");

const router = express.Router();
router.use("/user", userRoutes);
router.get("/", AuthRequestMiddlewares.checkAuth, infoController.info);

module.exports = router;
