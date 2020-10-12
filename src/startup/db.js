import {mongoose} from 'mongoose';
import {Fawn} from 'fawn';
import {winston} from 'winston';
import {config} from './../config';

module.exports = function () {
  const db = config.get("DB_CONN");
  mongoose
    .connect(
      db,
      { useNewUrlParser: true }
    )
    .then(() => winston.info(`Connected to ${db} ...`));
  Fawn.init(mongoose);
};
