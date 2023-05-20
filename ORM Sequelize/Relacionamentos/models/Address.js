// Criarei um relacionamento de usuarios com endereços

// Onde na tabela de endereços terei uma chave estrangeira do usuário

// Relacionando um endereço sempre com um usuario

const { DataTypes } = require("sequelize");

const dbconnection = require("../db/connection");

// Importo meu model User tambem para fazer o relacionamento
const User = require('./User')

const Address = dbconnection.define("Address", {
  street: {
    type: DataTypes.STRING,
    required: true,
  },
  number: {
    type: DataTypes.STRING,
    required: true,
  },
  city: {
    type: DataTypes.STRING,
    required: true,
  },
});

// Crio o relacionamento
Address.belongsTo(User)

module.exports = Address