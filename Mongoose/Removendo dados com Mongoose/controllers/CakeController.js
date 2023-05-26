// Importando meus models
const Cake = require("../models/Cake");

module.exports = class CakeController {
  static async showAllCakes(req, res) {
    // Função que pega todos os dados do banco com Mongoose!
    const cakes = await Cake.find().lean();
    res.render("cakes/all", { cakes });
  }

  static async createCake(req, res) {
    res.render("cakes/create");
  }

  static async createCakeSave(req, res) {
    // Função que fará o insert de dados no MongoDB com o Mongoose
    const cake = new Cake({
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      description: req.body.description,
    });

    await cake.save();

    res.redirect("/cakes");
  }

  static async getOneCake(req, res) {
    // Função que pega somente um dado especifico do banco com Mongoose.
    const id = req.params.id;

    const cake = await Cake.findById(id).lean();
    // Método findById consegue fazer a conversao do id do params pro hash do MongoDB e tras o dado prontinho.

    res.render("cakes/cake", { cake });
  }

  static async deleteOneCake(req, res) {
    const id = req.params.id;
    await Cake.deleteOne({ _id: id });

    res.redirect("/cakes");
  }

  static async viewEditCake(req, res) {
    const id = req.params.id;

    const cake = await Cake.findById(id).lean();

    res.render("cakes/edit", { cake });
  }

  static async editCake(req, res) {
    await Cake.updateOne(
      { _id: req.body.id },
      {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price,
      }
    );
    res.redirect("/cakes");
  }
};
