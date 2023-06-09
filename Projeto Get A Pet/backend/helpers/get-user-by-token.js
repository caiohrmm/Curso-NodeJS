const jwt = require("jsonwebtoken");

const User = require("../models/User");

// Essa funcao será responsavel por pegar um usuário pelo jwt token e nao pelo ID, para ficar mais seguro
const getUserByToken = async (token) => {
  if (!token) {
    // Se nao tiver token, dá acesso negado também
    return res.status(401).json({ message: "Acesso negado!" });
  }

  // Preciso do token do usuário para acessá-lo, no token eu tenho o id, entao pego ele por lá!
  const decoded = jwt.verify(token, "meusecretdificildemais123");

  const _id = decoded.id;

  const user = User.findOne({ _id }).select('-password');

  return user;
};

module.exports = getUserByToken;
