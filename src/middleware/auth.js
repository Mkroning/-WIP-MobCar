const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Acesso negado. Token não fornecido");

  try {
    const decoded = jwt.verify(token, config.get("JWT_PRIVATE_KEY"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Token invalido");
  }
};
