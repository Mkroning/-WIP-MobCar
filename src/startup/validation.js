import { Joi } from 'joi';

module.exports = function() {
  Joi.objectId = require("joi-objectid")(joi);
};
