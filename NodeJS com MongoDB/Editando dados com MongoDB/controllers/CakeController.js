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
    // Funcao que salvará o bolo cadastrado no mongodb
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.body.image;

    const cake = new Cake(name, image, price, description);

    cake.save();

    res.redirect("/cakes");
  }

  static async getOneCake(req, res) {
    // Função que pega somente um dado especifico do banco.
    const id = req.params.id;

    const cake = await Cake.getCakeById(id);

    res.render("cakes/cake", { cake });
  }

  static async deleteOneCake(req, res) {
    const id = req.params.id;
    await Cake.deleteCakeById(id);

    res.redirect("/cakes");
  }

  static async viewEditCake(req, res) {
    const id = req.params.id;
    const cake = await Cake.getCakeById(id);

    res.render("cakes/edit", { cake });
  }

  static async editCake(req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;

    const cake = new Cake(name, image, price, description)

    await cake.editCakeById(id);

    res.redirect("/cakes");
  }
};
