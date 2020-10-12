import 'express-async-errors';
import 'winston-mongodb';
import winston from 'winston';
import config from './../config'

module.exports = function () {
  winston.handleException(
    new winston.transport.Console({
      colorize: true, prettyPrint: true
    }),
    new winston.transport.File({
      filename: "combined.log"
    })
  );
  process.on("unhandledRejection", ex =>{
    throw ex;
  });

  winston.add(winston.transport.File, { filename: "combined.log"});
  winston.add(winston.transport.MongoDB, {
    db: config.get("DB_CONN"),
    level: "error"
  });
};

