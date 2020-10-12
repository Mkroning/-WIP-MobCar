import Joi, { func } from 'joi';

module.exports = function() {
  Joi.objectId = require("joi-objectid")(joi);
};
