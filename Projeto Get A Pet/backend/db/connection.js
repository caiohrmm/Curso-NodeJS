// Criando a conexão com o MongoDB através do mongoose.

const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(
    "mongodb://127.0.0.1:27017/getapet?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.1"
  );
  await mongoose.connect("mongodb://127.0.0.1:27017/getapet");

  console.log("Conectou ao Mongoose!");
}
