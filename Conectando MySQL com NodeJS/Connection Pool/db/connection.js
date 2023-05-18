// Esse arquivo serve para gerenciar as conexoes do meu banco e deixar ele o mais leve e bem utilizado possivel
// O pool controla as conexoes do meu banco, fazendo com que nao tenha conexoes desnecessarias.
const mysql = require("mysql");

const connection = mysql.createPool({
  connectionLimit: 10, // No máximo 10 conexoes
  host: "26.84.4.194",
  user: "caiohenrique",
  password: "joj123",
  database: "products",
});

// Exporto a funcao para eu conseguir utiliza-la na minha aplicacao
module.exports = connection;
