const config = require("config");

module.exports = function () {
  if(!config.get("JWT_PRIVATE_KEY")) {
    throw new Error("Error: JWT_PRIVATE_KEY is not defined");
  } else if(!config.get("DB_CONN")){
    throw new Error("Error: DB_Conn is not defined")
  }
};
