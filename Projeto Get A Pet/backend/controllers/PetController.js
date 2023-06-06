const Pet = require("../models/Pet");

module.exports = class PetController {
  // Criando um pet
  static async create(req, res) {
    // Pegar os dados do body

    const { name, weight, color, age } = req.body;

    // Toda vez que um pet for cadastrado, ele ficará disponivel, esse recurso so será trocado na edicao.
    const available = true;

    // Upload de imagens

    // Validações
    if (!name) {
      res.status(422).json({
        message: "O nome é obrigatório!",
      });
      return;
    }

    if (!weight) {
      res.status(422).json({
        message: "O peso é obrigatório!",
      });
      return;
    }
    if (!age) {
      res.status(422).json({
        message: "A idade é obrigatória!",
      });
      return;
    }
    if (!color) {
      res.status(422).json({
        message: "A cor é obrigatória!",
      });
      return;
    }
  }
};
