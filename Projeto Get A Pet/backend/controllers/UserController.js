const connection = require("../db/connection");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

// Importando o token
const createUserToken = require("../helpers/crete-user-token");

// Importando helper de pegar o token
const getToken = require("../helpers/get-token");

// Importando helper de pegar um usuario pelo token
const getUserByToken = require("../helpers/get-user-by-token");

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

    if (req.headers.authorization) {
      // Se eu tiver um token eu caio nesse if
      const token = getToken(req);
      const decoded = jwt.verify(token, "meusecretdificildemais123");

      currentUser = await User.findById(decoded.id);

      currentUser.password = undefined;
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  }

  static async getUserById(req, res) {
    const id = req.params.id;

    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(422).json({
        message: "Usuário não encontrado!",
      });
      return;
    } else {
      res.status(200).json({ user });
    }
  }

  static async editUser(req, res) {
    const { name, email, phone, password, confirmpassword } = req.body;

    // Checkando se o usuario existe
    const token = getToken(req); // Pega o token do usuário
    const user = await getUserByToken(token);

    if (req.file) {
      user.image = req.file.filename;
    }

    // Validação dos dados, igual na do registro.
    if (!name) {
      res.status(422).json({
        message: "O nome é obrigatório",
      });
      return;
    }

    user.name = name;

    // Se veio um email, preciso de outra validacao, pois o email editado pode ser de alguem do sistema.
    if (!email) {
      res.status(422).json({
        message: "O e-mail é obrigatório",
      });
      return;
    }
    // Check email
    const emailExists = await User.findOne({ email });

    if (email !== user.email && emailExists) {
      res.status(422).json({
        message: "Esse e-mail já está cadastrado no nosso sistema!",
      });
      return;
    }
    user.email = email;

    // Verificar se a senha do campo password e confirmpassword sao identicas
    if (password !== confirmpassword) {
      res.status(422).json({
        message: "As senhas não são iguais!",
      });
      return;
    } else if (password === confirmpassword && password != null) {
      // Se a senha for igual a senha confirmada e a senha for diferente de nula, eu crio uma nova senha.
      // Criando senha criptografada
      const salt = await bcrypt.genSalt(12); // Adiciona mais 12 caracteres para a senha
      const passwordHash = await bcrypt.hash(password, salt);
      user.password = passwordHash;
    }

    if (!phone) {
      res.status(422).json({
        message: "O telefone é obrigatório",
      });
      return;
    }
    user.phone = phone;

    try {
      // Atualizar o usuario com o user que criamos acima
      await User.findOneAndUpdate(
        {
          _id: user._id,
        },
        {
          $set: user,
        },
        {
          new: true,
        }
      );

      res.status(200).json({
        message: "Usuário atualizado com sucesso!",
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
      return;
    }
  }
};
