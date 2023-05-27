// Criando meu model de pet
const mongoose = require("../db/connection");

const { Schema } = mongoose;

const Pet = mongoose.model(
  "Pet",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      images: {
        type: Array,
        required: true,
      },
      available: {
        type: Boolean,
        required: true,
      },
      user: Object,
      adopter: Object,
    },
    { timestamps: true } // Faz a mesma coisa que o sequelize, adiciona 2 tabelas de data -> Criacao e Update.
  )
);

module.exports = Pet;
