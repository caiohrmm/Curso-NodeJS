// Importando meus models
const Cake = require("../models/Cake");

module.exports = class CakeController {
  static async showAllCakes(req, res) {
    // Função que pega todos os dados do banco!
    const cakes = await Cake.getAllCakes();
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

    await cake.save()

    res.redirect("/cakes");
  }

  static async getOneCake(req, res) {
    // Função que pega somente um dado especifico do banco.
    const id = req.params.id;

    const cake = await Cake.getCakeById(id);

    console.log(cake);
    res.render("cakes/cake", { cake });
  }

  static async deleteOneCake(req, res) {
    const id = req.params.id;
    await Cake.deleteCakeById(id);

    res.redirect("/cakes");
  }
};
