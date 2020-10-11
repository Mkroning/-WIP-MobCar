import mongoose from 'mongoose';
import Joi, { func } from 'joi';
import moment from 'moment';

const aluguel = new mongoose.Schema({
  user: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50
      },
      email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
      }
    }),
    required: true
  },
  carro: {
    tipo: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50
      },
      taxaDiaria: { 
        type: Number,
        required: true,
        min: 0,
        max: 255
      }
    }),
    required: true
  },
  dataSaida: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateRetorno: {
    type: Date
  },
  taxaAluguel: {
    type: Number,
    min: 0
  }
});

aluguel.static.lookup = function (userId, CarroId) {
  return this.findOne({
    "user._id": userId,
    "carro._id": CarroId,
    dateRetorno: undefined
  });
};

aluguel.methods.return = function() {
  this.dateRetorno = new Date();

  const aluguelPorDia = moment().diff(this.dataSaida, "dias");
  this.taxaAluguel = aluguelPorDia * this.carro.taxaDiaria;
};

export const Aluguel = mongoose.model("Aluguel", aluguel);

export function validaAluguel(aluguel) {
  const schema = { 
    CarroId: Joi.objectId().required()
  };
  return Joi.validate(aluguel, schema);
}