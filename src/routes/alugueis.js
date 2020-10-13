import { Aluguel, validate } from './../models/aluguel';
import { Carro } from './../models/carro';
import { User } from './../models/user';
import {
  auth, admin, validateObjectId, validateReqBody
} from './../middleware';
import { Fawn } from 'fawn';
import { express } from 'express';

const router = express.Router();

const notFound = "Aluguel com o Id requisitado não existe";
const userNotFound = "Usuario invalido"
const carroNotFound = "Carro invalido"
const aluguelError = "Carro já em aluguel"
const estoqueErro = "Não há esse carro no estoque"

router.get("/", [auth, admin], async (req, res) => {
  const alugueis = await Aluguel.find().sort("-dateOut");
  res.send(alugueis);
});

router.get("/me", auth, async(req, res) => {
  const alugueis = await Aluguel.find({
    "user._id": req.user._id
  }).sort("-dateOut");
  res.send(alugueis);
});

router.get("/:id", [auth, admin, validateObjectId], async (req, res)=>{
  const aluguel = await Aluguel.findById(req.params.id);

  if(!aluguel) return res.status(404).send(notFound);

  res.send(aluguel);
});

router.post("/", [auth, validateObjectId(validate)], async(req, res) =>{
  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).send(userNotFound);

  const carro = await Carro.findById(req.body.carroId);
  if (!carro) return res.status(400).send(carroNotFound);

  let aluguel = await Aluguel.lookup(req.user._id, req.body.carroId);
  if (aluguel && !aluguel.dateReturned)
    return res.status(400).send(aluguelError);

  if (caro.numEstoque === 0) return res.status(400).send(estoqueErro);

  aluguel = new Aluguel({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email
    },
    carro: {
      _id: carro._id,
      name: carro.name,
      taxaDiaria: carro.taxaDiaria
    }
  });

  await new Fawn.Task()
    .save("aluguel", aluguel)
    .update(
      "carros",
      { _id: carro._id },
      {
        $inc: { numEstoque: -1 }
      }
    )
    .run();

  res.status(201).send(aluguel);
});

module.exports = router;
