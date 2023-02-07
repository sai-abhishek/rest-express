import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { parseJWT } from "./src/controllers/adminController";
import adminRouter from "./src/routes/adminRouter";
import studentRouter from "./src/routes/studentRouter";

import Redis from "ioredis";
import { RateLimiterRedis } from "rate-limiter-flexible";

const app = express();
const PORT = 3000;

// mongoose connection
mongoose.connect("mongodb://localhost/stduent-db", {
  useNewUrlParser: true,
});

// redis store and rate limiter setup
const redisClient = new Redis({ enableOfflineQueue: false });
const rateLimiterRedis = new RateLimiterRedis({
  storeClient: redisClient,
  points: 3,
  duration: 10,
});

// req body parsing
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// JWT decoding
app.use(parseJWT);

// rate limiting if not logged in
app.use(async (req, res, next) => {
  try {
    if (!req.admin) {
      await rateLimiterRedis.consume(req.ip);
    }
    next();
  } catch (error) {
    res.status(429).send("Too Many Requests");
  }
});

// loading routers
app.use("/auth", adminRouter);
app.use("/students", studentRouter);

app.get("/", (req, res) => {
  res.send(`Hello world`);
});

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});
