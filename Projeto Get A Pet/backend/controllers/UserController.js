const connection = require("../db/connection");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

// Importando o token
const createUserToken = require("../helpers/crete-user-token");

// Importando helper de pegar o token
const getToken = require('../helpers/get-token')

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

  static async login(req, res) {
    // Funcao de login do usuario

    const { email, password } = req.body;

    // Validacoes
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
    // Checkar se o email que o usuario esta cadastrando ja existe no meu banco de dados.
    const user = await User.findOne({ email }); // email : email

    if (!user) {
      res.status(422).json({
        message:
          "Este usuário não existe em nosso banco de dados! Por favor, utilize um e-mail válido.",
      });
      return;
    }

    // Checkar se a senha vai dar match com a do banco
    const checkPassword = await bcrypt.compare(password, user.password);
    // Comparo a senha crua que o usuário passou no body com a senha criptografada do banco.

    if (!checkPassword) {
      res.status(422).json({
        message: "Senha inválida!",
      });
      return;
    }

    // Se passou por todas as validacoes, agora é só logar o usuario pelo middleware
    await createUserToken(user, req, res);
  }

  static async checkUser(req, res) {
    // Agora preciso criar uma rota get que verificará o usuario pelo Token dele.

    let currentUser; //usuario atual

    if (req.headers.authorization) { // Se eu tiver um token eu caio nesse if
        const token = getToken(req)
        const decoded = jwt.verify(token, 'meusecretdificildemais123')

        console.log(decoded)
        currentUser = await User.findById(decoded.id)

        currentUser.password = undefined

    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  }
};
