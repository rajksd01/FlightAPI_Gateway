const express = require("express");
const app = express();
const { logConfig } = require("./config");

const { ServerConfig } = require("../src/config");
const routes = require("../src/routes");
const { infoController } = require("./controllers");

app.use("/api", routes);
app.get("/", infoController.info);

app.listen(ServerConfig.PORT, () => {
  console.log("listening on port " + ServerConfig.PORT);
  logConfig.log({
    level: "info",
    message: `Running on port ${ServerConfig.PORT} `,
  });
});
