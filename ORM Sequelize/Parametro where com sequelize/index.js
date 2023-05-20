const express = require("express");
const exphbs = require("express-handlebars");

// Conexao com o MySQL através do pool
const dbconnection = require("./db/connection");

// Importo meus models
const User = require("./models/User");

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

app.get("/users/add", (req, res) => {
  res.render("adduser");
});

app.get("/users", async (req, res) => {
  // Terei minha função async pois ela esperará a chegada dos meus dados para renderizar!
  const users = await User.findAll({ raw: true });
  // Essa variavel receberá um array de objetos que virá do meu banco.
  // O parametro raw faz com que os dados já cheguem prontos para meu uso
  res.render("users", { users });
});

app.post("/users/insert", async (req, res) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  let isWorking = req.body.isworking;
  // Vai ser let pois irei mudar seu valor para se adaptar ao booleano.

  if (isWorking === "yes") {
    isWorking = true;
  } else {
    isWorking = false;
  }

  console.log(isWorking);

  // Aqui farei o INSERT dos dados pelo sequelize
  // Preciso de um await pois assim, eu espero o sequelize inserir meus dados para dar continuidade ao meu fluxo.
  await User.create({ name, occupation, isworking: isWorking });
  // Como é desestruturação, ou eu mando o nome da variavel do mesmo nome que a coluna do banco ou faço a troca por : na funcao.

  res.redirect("/users/add");
});

// Pegando apenas um usuário com o where metodo findOne
app.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({ raw: true, where: { id } });

  res.render("user", { user });
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
