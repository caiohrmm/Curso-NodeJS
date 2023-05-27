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
app.post("/create", (req, res) => {
  const name = req.body.name; // Esses dados vem do body da aplicação -> Front End
  const age = req.body.age;

  // Eles vem pra minha API e aqui eu faço a persistencia deles no banco.

  const user = {
    name,
    age,
  };

  // Usarei status nas minhas respostas como um feedback se a resposta chegou bem ou deu erro.

  /*
    https://restfulapi.net/http-status-codes/
    200 -> Ok
    404 -> Not found -> Página nao encontrada
    422 -> Variavel nao encontrada.
    201 -> Criou algo com exito  
  */

  res.status(201).json({ user });
});

// Se eu conectar essa API com uma aplicacao, quando o usuario acessar a rota / ele receberá o JSON.
app.get("/", (req, res) => {
  res.json({ nome: "Caio Henrique" });
});

app.listen(port, () => console.log(`API rodando na porta ${port}`));
