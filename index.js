import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { parseJWT } from "./src/controllers/adminController";
import adminRouter from "./src/routes/adminRouter";
import studentRouter from "./src/routes/studentRouter";

const app = express();
const PORT = 3000;

// mongoose connection
mongoose.connect("mongodb://localhost/stduent-db", {
  useNewUrlParser: true,
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

// loading routers
app.use("/auth", adminRouter);
app.use("/students", studentRouter);

app.get("/", (req, res) => {
  res.send(`Hello world`);
});

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});
