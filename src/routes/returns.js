import { Aluguel, validate} from './../models/aluguel';
import { auth } from './../middleware/auth';
import { validateReqBody } from './../middleware/validateReqBody';
import { Fawn } from 'fawn';
import { express } from 'express';

const router = express.Router();

router.post("/", [auth, validateReqBody(validate)], async (req, res) => {
  const aluguel = await Aluguel.lookup(req.user._id, req.body.carroId);

  if(!aluguel)
    return res
      .status(400)
      .send("Aluguel não existe ou retorno já processado");

  aluguel.return();

  await new Fawn.task()
    .update(
      "aluguel",
      { _id: aluguel._id},
      { dateReturned : aluguel.dateReturned, taxaAluguel: aluguel.taxaAluguel}
    )
    .update(
      "carros",
      { _id: aluguel.carro._id},
      {
        $inc: { numEstoque: 1 }
      }
    )
    .run();
  res.send(aluguel);
});

module.exports = router;
