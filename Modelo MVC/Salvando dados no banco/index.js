const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

const connection = require("./db/connection");

const port = 3000;

// Setup handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// Requirindo os models
const Task = require("./models/Task");

// Ler o body para pegar os valores do formulário
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Definir as pastas estáticas
app.use(express.static("public"));

// Requirindo minhas rotas
const tasksRoutes = require("./routes/tasksRoutes");

// Colocando as rotas de tasks dentro da minha aplicação
app.use("/tasks", tasksRoutes);

connection
  .sync()
  .then(() =>
    app.listen(port, () => console.log(`Servidor aberto na porta ${port}`))
  )
  .catch((err) => console.log(err));
