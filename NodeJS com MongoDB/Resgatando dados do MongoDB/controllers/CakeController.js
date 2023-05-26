// Importando meus models
const Cake = require("../models/Cake");

module.exports = class CakeController {
  static async showAllCakes(req, res) {
    const cakes = await Cake.getAllCakes();
    console.log(cakes);
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
};
