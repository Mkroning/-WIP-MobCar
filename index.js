const winston = require("winston");
const express = require("express");

const app = express();

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  winston.info(`Listen on Port ${port}...`)
);

module.exports = server;



