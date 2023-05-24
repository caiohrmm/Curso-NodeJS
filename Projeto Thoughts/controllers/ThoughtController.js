// Chamando meus models necessários
const Thought = require("../models/Thought");
const Thoughts = require("../models/Thought");
const User = require("../models/User");

module.exports = class ThoughtController {
  static async showThoughts(req, res) {
    res.render("thoughts/home");
  }
  static async dashboard(req, res) {
    res.render("thoughts/dashboard");
  }
  static async createThought(req, res) {
    res.render("thoughts/create");
  }
  static async createThoughtSave(req, res) {
    // Funcao que faz a insercao dos pensamentos no banco de dados.
    const title = req.body.title;

    if (req.session.userId) {
      const userId = req.session.userId;

      const thought = {
        title,
        UserId: userId,
      };

      try {
        await Thought.create(thought);

        req.flash("messagesuccess", "Pensamento criado com sucesso!");
        req.session.save(() => {
          res.redirect("/thoughts/dashboard");
        });
      } catch (error) {
        console.log(error)
      }
    }
  }
};
