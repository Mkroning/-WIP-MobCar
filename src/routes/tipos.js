import { Tipo, validate } from './../models/tipo';
import {
   auth, admin, validateObjectId, validatReqBody
  } from './../middleware';
import { express } from 'express';

const router = express.Router();

const notFound = "Tipo com o Id requisitado não existe";

router.get("/", async(req, res) => {
  const tipos = await Tipo.find().sort("name");
  res.send(tipos);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const tipo = await Tipo.findById(req.params.id);

  if (!tipo) return res.status(404).send(notFound);

  res.send(tipo);
});

router.post("/", [auth, admin, validatReqBody(validate)], async (req, res) =>{
  const tipo = new Tipo({ name: req.body.name});
  await tipo.save();

  res.status(201).send(tipo);
});

router.put("/:id", [auth, admin, validateObjectId, validateReqBody(validate)], async (req, res) => {
    const tipo = await Tipo.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );

    if (!tipo) return res.status(404).send(notFound);

    res.send(tipo);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const tipo = await Tipo.findByIdAndRemove(req.params.id);

  if (!tipo) return res.status(404).send(notFound);

  res.send(tipo);
});

module.exports = router;
