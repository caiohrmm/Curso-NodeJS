const express = require("express");
const exphbs = require("express-handlebars");

// Conexao com o MySQL através do pool
const dbconnection = require("./db/connection");

// Importo meus models
const User = require('./models/User')

const port = 3000;

const app = express();


// Setup handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// Ler o body para pegar os valores do formulário
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

// Agora, pra eu rodar o meu servidor eu vou depender do OK do banco de dados

dbconnection
  .sync()
  .then(
    app.listen(port, () =>
      console.log(
        `Servidor rodando na porta ${port} e conectado ao banco de dados.`
      )
    )
  )
  .catch((err) => console.log(err));

// O que acontece aqui, ele mapeará meu model para que, ao iniciar o servidor, esteja criada as tabelas e tudo funcionando perfeitamente para a persistencia de dados
// Se a tabela já existir ele ignora, se existir ele verifica se está tudo OK e abre meu servidor.
