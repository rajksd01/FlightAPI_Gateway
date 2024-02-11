const express = require("express");

const router = express.Router();
const { UserController } = require("../../controllers");

router.post("/signup", UserController.createUser);
router.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = router;
