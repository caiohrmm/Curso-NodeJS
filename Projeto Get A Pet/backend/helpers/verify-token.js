const getToken = require("./get-token");
const jwt = require("jsonwebtoken");

// Middleware que valida o token
// Algumas rotas precisam de proteção, entao so liberamos o acesso delas após ter o token do usuario verificado.
const checkToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Acesso negado!" });
  } // Se nao vir nada no campo de authorization que e onde fica o token, ele da acesso negado.

  const token = getToken(req); // Pega o token

  if (!token) {
    // Se nao tiver token, dá acesso negado também
    return res.status(401).json({ message: "Acesso negado!" });
  }

  // Verificando meu token com o jwt agora
  try {
    const verified = jwt.verify(token, "meusecretdificildemais123");
    console.log(verified);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Token inválido!" });
  }
};

module.exports = checkToken;
