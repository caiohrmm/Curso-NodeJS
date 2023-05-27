const express = require("express");

const app = express();

const port = 3000;

// Lendo o body
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// Rotas -> endpoints

// Se eu conectar essa API com uma aplicacao, quando o usuario acessar a rota / ele receberá o JSON.
app.get("/", (req, res) => {
  res.json({ nome: "Caio Henrique" });
});

app.listen(port, () => console.log(`API rodando na porta ${port}`));
