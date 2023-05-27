const jwt = require("jsonwebtoken");

const createUserToken = async (user, req, res) => {
  // Criando o token
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    "meusecretdificildemais123"
  );

  // Retornando meu token para permitir a autenticacao do usuário.
  res.status(200).json({
    message: "Você está autenticado!",
    token,
    userID: user._id,
    name: user.name,
  });
};

module.exports = createUserToken;
