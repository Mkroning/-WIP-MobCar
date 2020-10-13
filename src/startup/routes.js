import {express} from 'express';
import {marcas} from './../routes/marcas';
import {tipos} from './../routes/tipos';
import {carros} from './../routes/carros';
import {alugueis} from './../routes/alugueis';
import {returns} from './../routes/returns';
import {register} from './../routes/register';
import {login} from './../routes/login';
import {users} from './../routes/users';
import {error} from './../middleware/error';

module.exports = function (app) {
  app.use(express.json());
  app.use("/marcas", marcas);
  app.use("/tipos", tipos);
  app.use("/carros", carros);
  app.use("/alugueis", alugueis);
  app.use("/returns", returns);
  app.use("/register", register);
  app.use("/login", login);
  app.use("/users", users);
  app.use(error);
};
