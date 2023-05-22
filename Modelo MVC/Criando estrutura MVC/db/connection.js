// Fazendo a conexao com o banco pelo sequelize
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("estruturamvc", "caioh", "caiohenrique@12345", {
  host: "26.185.31.219",
  dialect: "mysql",
});

module.exports = sequelize;
