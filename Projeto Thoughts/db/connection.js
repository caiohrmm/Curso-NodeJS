// Fazendo a conexao com o banco pelo sequelize
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("projetothoughts", "caioh", "caiohenrique@12345", {
  host: "26.185.31.219",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Conectado ao banco de dados!");
} catch (error) {
  console.log(`Não foi possível conectar ao banco de dados : ${error}`);
}

module.exports = sequelize;
