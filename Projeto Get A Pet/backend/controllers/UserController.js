const connection = require("../db/connection");

const bcrypt = require("bcrypt");

const User = require("../models/User");

// Importando o token
const createUserToken = require("../helpers/crete-user-token");

module.exports = class UserController {
  static async register(req, res) {
    // Criando a funcao de registro

    // Recebendo dados do body do front end
    const { name, email, phone, password, confirmpassword } = req.body;

    // Validacoes
    if (!name) {
      res.status(422).json({
        message: "O nome é obrigatório",
      });
      return;
    }

    if (!email) {
      res.status(422).json({
        message: "O e-mail é obrigatório",
      });
      return;
    }

    if (!password) {
      res.status(422).json({
        message: "A senha é obrigatória",
      });
      return;
    }

    if (!confirmpassword) {
      res.status(422).json({
        message: "A confirmação de senha é obrigatória",
      });
      return;
    }

    if (!phone) {
      res.status(422).json({
        message: "O telefone é obrigatório",
      });
      return;
    }
    // Valido todos os dados para prosseguir com mais validacoes

    // Verificar se a senha do campo password e confirmpassword sao identicas
    if (password !== confirmpassword) {
      res.status(422).json({
        message: "As senhas não são iguais!",
      });
      return;
    }

    // Checkar se o email que o usuario esta cadastrando ja existe no meu banco de dados.
    const userExists = await User.findOne({ email }); // email : email

    if (userExists) {
      res.status(422).json({
        message:
          "O usuário já existe em nosso banco de dados! Por favor, utilize outro e-mail.",
      });
      return;
    }

    // Criando senha criptografada
    const salt = await bcrypt.genSalt(12); // Adiciona mais 12 caracteres para a senha
    const passwordHash = await bcrypt.hash(password, salt);

    // Agora criarei o usuario pronto para ser adicionado ao banco

    const user = new User({
      name,
      email,
      password: passwordHash,
      phone,
    });

    try {
      // Inserindo usuario no banco!
      const newUser = await user.save();
      await createUserToken(newUser, req, res);

    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
};
