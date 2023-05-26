const connection = require("../db/connection");

const { ObjectId } = require("mongodb");

class Cake {
  // Na classe eu irei construir os atributos da minha collection
  constructor(name, image, price, description) {
    this.name = name;
    (this.image = image), (this.price = price);
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

  static async getAllCakes() {
    const cakes = await connection.db().collection("cakes").find().toArray();
    // Gero um array com todos meus documents(dados)
    return cakes;
  }

  static async getCakeById(id) {
    const objectId = new ObjectId(id);
    const cake = await connection
      .db()
      .collection("cakes")
      .findOne({ _id: objectId });
    // Uso o metodo ObjectId importado do mongodb para converter o numero no id do objeto requerido.
    return cake;
  }

  static async deleteCakeById(id) {
    const objectId = new ObjectId(id);
    await connection.db().collection("cakes").deleteOne({ _id: objectId });

    return;
  }
}

module.exports = Cake;
