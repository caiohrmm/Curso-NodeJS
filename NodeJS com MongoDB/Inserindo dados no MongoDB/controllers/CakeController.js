// Importando meus models
const Cake = require("../models/Cake");

module.exports = class CakeController {
  static async showAllCakes(req, res) {
    res.render("cakes/all");
  }

  static async createCake(req, res) {
    res.render("cakes/create");
  }

  static async createCakeSave(req, res) {
    // Funcao que salvará o bolo cadastrado no mongodb
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;

    const cake = new Cake(name, price, description);

    cake.save();

    res.redirect("/cakes");
  }
};
