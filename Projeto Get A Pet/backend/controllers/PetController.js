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

    const pets = await Pet.find({ "user._id": user._id })
    // Quando preciso filtrar algum dado de um subdocument do MongoDB eu filtro por ''.
    res.status(200).json({
      pets,
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
      pet,
    });
  }

  static async deletePetById(req, res) {
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

    // Checkar se o usuario que está logado registrou o pet

    const token = getToken(req);
    const user = await getUserByToken(token);

    // Fazer uma comparacao se o id do usuario está cadastrado no subdocument do pet.

    console.log(user.id);
    console.log(pet.user._id);
    if (user.id !== pet.user._id.toString()) {
      res.status(404).json({
        message:
          "Houve um problema parar processar a remoção! Tente novamente.",
      });
      return;
    }

    try {
      await Pet.findByIdAndDelete(id);
      res.status(200).json({
        message: `O pet ${pet.name} foi removido com sucesso!`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async updatePetById(req, res) {
    // Funcao que irá atualizar o pet baseado no id
    const id = req.params.id;

    // Verifica se existe esse ID no banco.
    if (!ObjectId.isValid(id)) {
      res.status(422).json({
        message: "ID Inválido!",
      });
      return;
    }

    const { name, weight, color, age, available } = req.body;

    const images = req.files;

    const updatedData = {};

    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({
        message: "Pet não encontrado!",
      });
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (user.id !== pet.user._id.toString()) {
      res.status(404).json({
        message: "Houve um problema parar processar a edição! Tente novamente.",
      });
      return;
    }

    if (!name) {
      res.status(422).json({
        message: "O nome é obrigatório!",
      });
      return;
    } else {
      updatedData.name = name;
    }

    if (!weight) {
      res.status(422).json({
        message: "O peso é obrigatório!",
      });
      return;
    } else {
      updatedData.weight = weight;
    }
    if (!age) {
      res.status(422).json({
        message: "A idade é obrigatória!",
      });
      return;
    } else {
      updatedData.age = age;
    }
    if (!color) {
      res.status(422).json({
        message: "A cor é obrigatória!",
      });
      return;
    } else {
      updatedData.color = color;
    }

    if (images.length === 0) {
      res.status(422).json({
        message: "A imagem é obrigatória!",
      });
    } else {
      updatedData.images = [];
      images.map((image) => {
        updatedData.images.push(image.filename);
      });
    }

    // Se passar por todas as validações ele atualiza o pet
    try {
      await Pet.findByIdAndUpdate(id, updatedData);
      res.status(200).json({ message: `O pet foi atualizado com sucesso.` });
    } catch (error) {
      console.log(error);
    }
  }

  static async schedule(req, res) {
    const id = req.params.id;

    // Checkar se o pet existe!
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({
        message: "Pet não encontrado!",
      });
      return;
    }

    // Verificar se o pet é meu. Não posso marcar visita para meu próprio pet!
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (
      user.id === pet.user._id.toString() /* pet.user._id.equals(user.id) */
    ) {
      res.status(422).json({
        message: "Você não pode agendar uma visita para seu próprio pet !",
      });
      return;
    }

    // Checkar se o usuário que está querendo a visita, já agendou uma visita
    if (pet.adopter) {
      if (pet.adopter._id.equals(user.id)) {
        res.status(422).json({
          message: "Você já agendou uma visita para esse Pet!",
        });
        return;
      }
    }

    // Se passou por todas as validações, eu adicionarei o usuário como adotante do pet!
    pet.adopter = {
      _id: user.id,
      name: user.name,
      image: user.image,
      phone: user.phone,
    };

    await Pet.findByIdAndUpdate(id, pet);

    res.status(200).json({
      message: `A visita foi cadastrada com sucesso, entre em contato com ${pet.user.name} no telefone ${pet.user.phone}`,
    });
  }

  static async concludeAdoption(req, res) {
    const id = req.params.id;

    // Verificar se o pet existe
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({
        message: "Pet não encontrado!",
      });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (user.id.toString() !== pet.user._id.toString()) {
      res.status(404).json({
        message: "Houve um problema parar processar a adoção! Tente novamente.",
      });
      return;
    }

    pet.available = false;

    await Pet.findByIdAndUpdate(id, pet);

    res.status(200).json({
      message: "Parabéns. O ciclo de adoção foi finalizado com sucesso!",
    });
  }
};
