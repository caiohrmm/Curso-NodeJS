const connection = require("../db/connection");

class Cake {
  // Na classe eu irei construir os atributos da minha collection
  constructor(name, price, description) {
    this.name = name;
    this.price = price;
    this.description = description;
  }

  save() {
    // Esse save será responsavel por criar a collection e inserir os campos de name, price e description nela.
    const cake = connection.db().collection("cakes").insertOne({
      name: this.name,
      price: this.price,
      description: this.description,
    });
    return cake;
  }
}

module.exports = Cake;
