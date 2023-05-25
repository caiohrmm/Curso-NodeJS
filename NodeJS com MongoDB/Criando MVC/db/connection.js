const { MongoClient } = require("mongodb"); // Cliente do MongoDB

const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.1/projetomongodb";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Conectado ao MongoDb");
  } catch (error) {
    console.log(error);
  }
}

run();

module.exports = client;
 