const Pet = require("../models/Pet");

const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

const ObjectId = require("mongoose").Types.ObjectId;

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
        _id: user._id,
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

  static async getAllPets(req, res) {
    // Funcao que vai para a rota de GET para ver todos os PETS do sistema.

    const pets = await Pet.find().sort("-createdAt"); // Pega os pets dos mais novos para os mais velhos.

    res.status(200).json({
      message: pets,
    });
  }

  static async getAllUserPets(req, res) {
    // Funcao que vai pegar os pets do usuario do banco.

    const token = getToken(req);
    const user = await getUserByToken(token); // Pegando meu usuario baseado no token.

    const pets = await Pet.find({ "user._id": user.id }).sort("-createdAt");

    // Quando preciso filtrar algum dado de um subdocument do MongoDB eu filtro por ''.
    res.status(200).json({
      message: pets,
    });
  }

  static async getAllUserAdoptions(req, res) {
    // Funcao que vai pegar os pets que o usuario deseja adotard

    const token = getToken(req);
    const user = await getUserByToken(token); // Pegando meu usuario baseado no token.

    const pets = await Pet.find({ "adopter._id": user.id }).sort("-createdAt");

    // Quando preciso filtrar algum dado de um subdocument do MongoDB eu filtro por ''.
    res.status(200).json({
      message: pets,
    });
  }

  static async getPetById(req, res) {
    const id = req.params.id;

    // Verifica se existe esse ID no banco.
    if (!ObjectId.isValid(id)) {
      res.status(422).json({
        message: "ID Inválido!",
      });
      return;
    }
    // Checkar se existe um pet no id 
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({
        message: "Não existe nenhum pet cadastrado com esse ID!!",
      });
      return;
    }

    res.status(200).json({
      pet
    })
  }
};
