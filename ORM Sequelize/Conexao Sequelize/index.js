const express = require("express");
const exphbs = require("express-handlebars");

// Conexao com o MySQL através do pool
const connection = require("./db/connection");

// Os parametros sao host, user, password e o banco que irei ligar.

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

app.get('/', (req, res) => {
  res.render('home')
})

// Agora, pra eu rodar o meu servidor eu vou depender do OK do banco de dados
app.listen(port, (err) => {
  if (err) {
    console.log("Erro ao conectar com o banco de dados");
  } else {
    console.log(
      `Servidor rodando na porta ${port} e conectado ao banco de dados.`
    );
  }
});
