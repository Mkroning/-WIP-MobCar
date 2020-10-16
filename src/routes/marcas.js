const { Marca, validate } = require("./../models/marca");
const auth = require("./../middleware/auth");
const admin = require("./../middleware/admin");
const validateObjectId = require("./../middleware/validateObjectId");
const validateReqBody = require("./../middleware/validateReqBody");
const express = require("express");
const router = express.Router();

const notFound = "Marca com o Id fornecido não existe";

router.get("/", async (req, res) => {
  const marcas = await Marca.find().sort("name");
  res.send(marcas);
});

router.get("/:id", async (req, res) => {
  const marca = await Marca.findById(req.params.id);

  if (!marcas) return res.status(404).send(notFound);

  res.send(marca)
});

router.post("/", [auth, admin, validateReqBody(validate)], async (req, res) => {
  const marca = new Marca({ name: req.body.name});
  await marca.save();

  res.status(201).send(marca);
});

router.put("/:id", [auth, admin, validateObjectId, validateReqBody(validate)], async (req, res) => {
  const marca = await Marca.findByIdAndUpdate(
    req.params.id,
    {name: req.body.name},
    {new:true}
  );
  if (!marca) return res.status(404).send(notFound);

  res.send(marca);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const marca = await Marca.findByIdAndRemove(req.params.id);

  if (!marca) return res.status(404).send(notFound);

  res.send(marca);
});
module.exports = router;
