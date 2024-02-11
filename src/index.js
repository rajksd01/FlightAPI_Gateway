const express = require("express");
const app = express();
const { logConfig } = require("./config");

const { ServerConfig } = require("../src/config");
const apiRoutes = require("../src/routes");
const { infoController } = require("./controllers");

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use("/api", apiRoutes);

app.get("/", infoController.info);

app.listen(ServerConfig.PORT, () => {
  console.log("listening on port " + ServerConfig.PORT);
  logConfig.log({
    level: "info",
    message: `Running on port ${ServerConfig.PORT} `,
  });
});
