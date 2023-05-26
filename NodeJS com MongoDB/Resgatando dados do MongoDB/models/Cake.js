const connection = require("../db/connection");

class Cake {
  // Na classe eu irei construir os atributos da minha collection
  constructor(name, image, price, description) {
    this.name = name;
    this.image = image,
    this.price = price;
    this.description = description;
  }

  // Função que salva os dados no banco, faz o insert.
  save() {
    // Esse save será responsavel por criar a collection e inserir os campos de name, price e description nela.
    const cake = connection.db().collection("cakes").insertOne({
      name: this.name,
      price: this.price,
      image: this.image,
      description: this.description,
    });
    return cake;
  }

  // Função que pega os dados do banco, faz um find() -> SELECT

  static getAllCakes() {
    const cakes = connection.db().collection("cakes").find().toArray();
    // Gero um array com todos meus documents(dados)
    return cakes;
  }
}

module.exports = Cake;
