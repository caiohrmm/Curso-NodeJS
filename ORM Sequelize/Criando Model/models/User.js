// Cada tabela será representada por um model

const { DataTypes } = require("sequelize"); // Importo os datatypes do sequelize, que são os tipos dos atributos como STRING, not null, DATETIME

// Importo a conexão do meu banco.
const dbConnection = require('../db/connection')

// Agora criarei meu model
const User = dbConnection.define('User', {
    name: {
        type: DataTypes.STRING,
        required: true, // Forma correta de utilizar o not null
    },
    occupation: {
        type: DataTypes.STRING,
        required: true,
    },
    isworking: {
        type: DataTypes.BOOLEAN,
        required: true,
    } 
})

// No meu model preciso colocar como parametro o nome da tabela que ele criará e seus atributos com seus tipos, tipos de dados e outras coisas.
// O id é gerado automaticamente em todas as tabelas!!

module.exports = User