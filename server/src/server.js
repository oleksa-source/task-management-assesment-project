const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("common"));

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get("/health-check", (_, res) => res.send("OK"));

module.exports = app;
