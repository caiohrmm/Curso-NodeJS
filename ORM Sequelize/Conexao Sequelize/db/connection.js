// Conectando o sequelize
// Obs -> O sequelize requer o pacote mysql2
const { Sequelize } = require("sequelize");

// Agora estanciarei a classe sequelize e passarei minhas informacoes basicas
/* new Sequelize('database', 'user', 'password', { host: 'localhost', dialect: 'bancoquequerointegrar'}) */
const sequelize = new Sequelize('sequelize', 'caioh', 'caiohenrique@12345', {
  host: 'localhost',
  dialect: 'mysql',
})

try {
  sequelize.authenticate()
  console.log('Conectado ao sequelize!')
} catch (error) {
  console.log(`Não foi possível conectar ao sequelize : ${error}`) 
}

module.exports = sequelize

