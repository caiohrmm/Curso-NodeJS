// Criando meu model de Task, ou seja, será uma tabela do meu banco de dados.

const { DataTypes } = require("sequelize");

const connection = require("../db/connection");

const Task = connection.define("Task", {
  title: {
    type: DataTypes.STRING,
    required: true,
  },
  description: {
    type: DataTypes.STRING,
    required: true,
  },
  done: {
    type: DataTypes.BOOLEAN,
    required: true,
  },
});

module.exports = Task
