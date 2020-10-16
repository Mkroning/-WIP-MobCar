const mongoose = require("mongoose");
const Joi = require("joi");
const { Marca } = require("./marca");
const { Tipo } = require("./tipo");

export const Carro = mongoose.model(
  "Carro",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    marca: {
      type: Marca.schema,
      required: true
    },
    tipo: {
      tipo: Tipo.schema,
      required: true
    },
    numAssentos: {
      type: Number,
      min: 1,
      max: 255,
      default: 5
    },
    numPortas: {
      type: Number,
      min: 1,
      max: 255,
      default: 4
    },
    tramissao: {
      type: Number,
      enum: ["Manual", "Automatico"],
      default: "Manual"
    },
    arCondicionado: {
      type: Boolean,
      default: false
    },
    numEstoque: {
      type: Number,
      required: true,
      min: 0,
      max: 255
    },
    taxaDiaria: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
      default: 99
    }
  })
);

export function validaCarro(carro) {
  const schema = {
    name: Joi.string()
      .min(1)
      .max(50)
      .required(),
    marcaId: Joi.objectId().required(),
    tipoId: Joi.objectId().required(),
    numAssentos: Joi.number()
      .integer()
      .min(1),
    numPortas: Joi.number()
      .integer()
      .min(1),
    tramissao: Joi.string().only("Manual", "Automatico"),
    arCondicionado: Joi.boolean(),
    numEstoque: Joi.number()
      .integer()
      .min(0)
      .required(),
    taxaDiaria: Joi.number()
      .min(0)
      ,required()
  };

  return Joi.validate(carro, schema);
}
