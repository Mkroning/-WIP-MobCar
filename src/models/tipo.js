import {mongoose} from 'mongoose';
import {Joi} from 'joi';

export const Tipo = mongoose.model(
  "Tipo",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 50
    }
  })
);

export function validaTipo(tipo) {
  const schema = {
    name: Joi.string()
      .min(1)
      .max(50)
      .required()
  };
  return Joi.validate(tipo, schema);
}
