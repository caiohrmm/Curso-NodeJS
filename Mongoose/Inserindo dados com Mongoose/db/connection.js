// Irei configurar o mongoose aqui, uma ODM para usar o MongoDB

const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(
    "mongodb://127.0.0.1:27017/projetomongodb?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.1"
  );
  console.log("Conectado ao Mongoose!");
}

main().catch((err) => console.log(err));

module.exports = mongoose;
