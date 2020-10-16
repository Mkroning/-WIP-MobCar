const mongoose = require("mongoose");
const Joi = require("joi");

export const Marca = mongoose.model(
  "marca",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength:1,
      maxlength: 50
    }
  })
);

export function validaMarca(marca) {
  const schema = {
    name: Joi.string()
      .min(1)
      .max(50)
      .required()
  };
  return Joi.validate(marca, schema);
}

