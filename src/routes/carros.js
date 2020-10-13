import { Carro, validate} from './../models/carro';
import { Marca } from './../models/marca';
import { Tipo } from './../models/tipo';
import { auth } from './../middleware/auth';
import { admin } from './../middleware/admin';
import { validateObjectId } from './../middleware/validateObjectId';
import { validateReqBody } from './../middleware/validateReqBody';
import { express } from 'express';

const router = express.Router();

const notFound = "Carro com o Id Fornecido não encontrado";
const marcaErro = "Marca Invalida";
const tipoErro = "Tipo Invalido";

router.get("/", async (req, res) => {
  const carros = await Carro.find().sort("name");
  res.send(carros);
});

router.get("/:id", validateObjectId, async(req, res) =>{
  const carro = await Carro.findById(req.params.id);

  if(!carro) return res.status(404).send(notFound);

  res.send(carro);
});

router.post("/", [auth, admin, validateReqBody(validate)], async(req, res)=> {
  const marca = await Marca.findById(req.body.marcaId);
  if(!marca) return res.status(400).send(marcaErro);

  const tipo = await Tipo.findById(req.body.tipoId);
  if(!tipo) return res.status(400).send(tipoErro);

  const carro = new Carro(setValues(req, marca, tipo));
  await carro.save();

  res.status(201).send(carro);
});

router.put("/:id",
[auth, admin, validateObjectId, validateReqBody(validate)],
async (req, res) => {
  const marca = await Marca.findById(req.body.marcaId);
  if (!marca) return res.status(400).send(marcaErro);

  const tipo = await Tipo.findById(req.body.tipoId);
  if (!tipo) return res.status(400).send(tipoErro);

  const car = await Carro.findByIdAndUpdate(
    req.params.id,
    setValues(req, marca, tipo),
    {
      new: true
    }
  );

  if (!car) return res.status(404).send(notFound);

  res.send(car)
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) =>{
  const carro = await Carro.findByIdAndRemove(req.params.id);
  if(!carro) return res.status(404).send(notFound);

  res.send(car);
});

function setValues(req, marca, tipo) {
  return {
    name: req.body.name,
    marca: {
      _id: marca._Id,
      name: marca.name
    },
    tipo: {
      _id: tipo._id,
      name: tipo.name
    },
    numAssentos: req.body.numAssentos,
    numPortas: req.body.numPortas,
    tramissao: req.body.tramissao,
    arCondicionado: req.body.arCondicionado,
    numEstoque: req.body.numEstoque,
    taxaDiaria: req.body.taxaDiaria
  };
}

module.exports = router;
