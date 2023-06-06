const Pet = require("../models/Pet");

const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class PetController {
  // Criando um pet
  static async create(req, res) {
    // Pegar os dados do body

    const { name, weight, color, age } = req.body;

    const images = req.files;

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

    if (images.length === 0) {
      res.status(422).json({
        message: "A imagem é obrigatória!",
      });
    }

    // Pegar o dono do usuário
    const token = getToken(req);
    const user = await getUserByToken(token);
    // Espero o usuário chegar e sigo com a criacao do pet.

    // Se passar nas validacoes, eu crio o pet
    const pet = new Pet({
      name,
      age,
      weight,
      color,
      available,
      images: [],
      user: {
        _id: user.id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    });

    // Percorrer o array de imagens para renomeá-las com o nome que eu quero.
    images.map((image) => {
      pet.images.push(image.filename);
    });

    // Salvando o pet no banco
    try {
      const newPet = await pet.save();
      res.status(201).json({
        message: "Pet cadastrado com sucesso.",
        newPet,
      });
    } catch (error) {
      console.log(error);
    }
  }
};
