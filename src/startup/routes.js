import {express} from 'express';
import {marcas} from './../routes/marcas';
import {tipos} from './../routes/tipos';
import {carros} from './../routes/carros';
import {alugueis} from './../routes/alugueis';
import {retorno} from './../routes/retorno';
import {registro} from './../routes/registro';
import {login} from './../routes/login';
import {usarios} from './../routes/usuarios';
import {error} from './../middleware/error';

module.exports = function (app) {
  app.use(express.json());
  app.use("/marcas", marcas);
  app.use("/tipos", tipos);
  app.use("/carros", carros);
  app.use("/alugueis", alugueis);
  app.use("/retorno", retorno);
  app.use("/registro", registro);
  app.use("/login", login);
  app.use("/usarios", usarios);
  app.use(error);
};
