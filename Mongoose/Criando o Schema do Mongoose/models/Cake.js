// Criando meu Schema
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Criando meu Schema, preciso do nome do model e das propriedades da minha collection que será criada.
const Cake = mongoose.model(
  "Cake",
  new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  })
);

module.exports = Cake;
