const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const { logConfig } = require("./config");

const { ServerConfig } = require("../src/config");
const apiRoutes = require("../src/routes");
const { infoController } = require("./controllers");
const { createProxyMiddleware } = require("http-proxy-middleware");

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
// proxy for flights
app.use(
  "/flightservices",
  createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true,
  })
);
//proxy  for bookings

app.use(
  "/bookingservices",
  createProxyMiddleware({
    target: "http://localhost:4000",
    changeOrigin: true,
  })
);

app.listen(ServerConfig.PORT, () => {
  console.log("listening on port " + ServerConfig.PORT);
  logConfig.log({
    level: "info",
    message: `Running on port ${ServerConfig.PORT} `,
  });
});
