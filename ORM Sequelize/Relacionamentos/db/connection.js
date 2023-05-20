// Conectando o sequelize
// Obs -> O sequelize requer o pacote mysql2
const { Sequelize } = require("sequelize");

// Agora estanciarei a classe sequelize e passarei minhas informacoes basicas
/* new Sequelize('database', 'user', 'password', { host: 'localhost', dialect: 'bancoquequerointegrar'}) */
const sequelize = new Sequelize('sequelize', 'caioh', 'caiohenrique@12345', {
  host: '26.185.31.219',
  dialect: 'mysql',
})
// Os parametros sao host, user, password e o banco que irei ligar.
module.exports = sequelize

