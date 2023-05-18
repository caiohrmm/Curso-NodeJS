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

// Insert / Create
app.post("/product/add", (req, res) => {
  const name = req.body.name;
  const price = req.body.price;

  // Recebi os dados do meu formulario nas variaveis, agora irei jogar para o banco
  const sql = `INSERT INTO product (nameproduct, priceproduct) VALUES ('${name}', ${price})`;
  // Preciso criar uma string que contenha o comando sql de insert

  // Após criado a string que contenha o comando sql, preciso executalo
  connection.query(sql, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Os dados foram adicionados no banco");
      res.redirect("/");
    }
  });
});

// Select / Read
app.get("/products", (req, res) => {
  // Aqui irei fazer o select dos meus dados
  const sql = `SELECT * FROM product`;

  // Essa execucacao me voltará dados, que conseguirei acessar via parametro da minha funcao de callback
  connection.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const products = data;
      console.log(products)
      res.render("products", { products });
    }
  });
});

/* Agora, irei criar a página que filtrará um produto especifico, ou seja, quando o usuario
clickar no titulo do produto, ele guardará seu id e isso me dará o seu filtro para exibir uma tela com somente esse produto.
*/

app.get('/products/:id', (req, res) => {
  const id = req.params.id 
})

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
