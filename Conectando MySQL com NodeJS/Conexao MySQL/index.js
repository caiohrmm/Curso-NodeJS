const express = require("express");
const exphbs = require("express-handlebars");

// Conexao com o MySQL
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "products",
});
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

app.post("/product/add", (req, res) => {
  const name = req.body.name;
  const price = req.body.price;

  // Recebi os dados do meu formulario nas variaveis, agora irei jogar para o banco
  const sql = `INSERT INTO product (nameproduct, priceproduct) VALUES ('${name}', ${price})`;
  // Preciso criar uma string que contenha o comando sql de insert

  // Após criado a string que contenha o comando sql, preciso executalo
  connection.query(sql, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Os dados foram adicionados no banco')
        res.redirect("/");
    }
})


});

app.get("/products", (req, res) => {
  res.render("products");
});

app.get("/", (req, res) => {
  res.render("home");
});

// Agora, pra eu rodar o meu servidor eu vou depender do OK do banco de dados

connection.connect((err) => {
  if (err) {
    console.log("Erro ao conectar com o banco de dados");
  } else {
    app.listen(port, () =>
      console.log(
        `Servidor rodando na porta ${port} e conectado ao banco de dados.`
      )
    );
  }
});
