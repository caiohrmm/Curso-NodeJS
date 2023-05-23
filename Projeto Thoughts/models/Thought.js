// Esse será o model do pensamento, o pensamento terá apenas um titulo.

// Ele terá como chave estrangeira o usuário que fez esse pensamento!

const { DataTypes } = require("sequelize");

const dbConnection = require("../db/connection");

// Importando o model do user

const Thought = dbConnection.define('Tought', {
    title: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
    },
})


module.exports = Thought
