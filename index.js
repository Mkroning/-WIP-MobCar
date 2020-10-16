const winston = require("winston");
const express = require("express");
const app = express();

require("./src/startup/config")();
require("./src/startup/logging")();
require("./src/startup/dev")(app);
require("./src//startup/prod")(app);
require("./src/startup/routes")(app);
require("./src/startup/db")();
require("./src/startup/validation")();

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  winston.info(`Listen on Port ${port}...`)
);

module.exports = server;



