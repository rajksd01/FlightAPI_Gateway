const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const { logConfig } = require("./config");

const { ServerConfig } = require("../src/config");
const apiRoutes = require("../src/routes");
const { infoController } = require("./controllers");

// setting up ratelimiter

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  limit: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7",
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(limiter);
app.use("/api", apiRoutes);

app.get("/", infoController.info);

app.listen(ServerConfig.PORT, () => {
  console.log("listening on port " + ServerConfig.PORT);
  logConfig.log({
    level: "info",
    message: `Running on port ${ServerConfig.PORT} `,
  });
});
