import { User } from './../models/user';
import { auth } from './../middleware/auth';
import { admin } from './../middleware/admin';
import { express } from 'express';

const router = express.Router();

router.get("/", [auth, admin], async (req, res) => {
  const users = await User.find()
    .select("-password")
    .sort("email");
  res.send(users);
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

module.exports = router;
