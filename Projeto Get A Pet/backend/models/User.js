// Criando meu model de usuario
const mongoose = require("../db/connection");

const { Schema } = mongoose;

const User = mongoose.model(
  "User",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    { timestamps: true } // Faz a mesma coisa que o sequelize, adiciona 2 tabelas de data -> Criacao e Update.
  )
);

module.exports = User;
