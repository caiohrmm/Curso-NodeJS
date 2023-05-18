const express = require("express");
const exphbs = require("express-handlebars");

// Conexao com o MySQL
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "26.84.4.194",
  user: "caiohenrique",
  password: "joj123",
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
      res.render("products", { products });
    }
  });
});

/* Agora, irei criar a página que filtrará um produto especifico, ou seja, quando o usuario
clickar no titulo do produto, ele guardará seu id e isso me dará o seu filtro para exibir uma tela com somente esse produto.
*/

app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // Tenho o id que será o parametro do meu where, agora preciso do comando sql
  const sql = `SELECT * FROM product WHERE idproduct=${id}`;

  connection.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    } else {
      const product = data[0]; // Como só chegará um produto, pego o array do primeiro objeto.
      res.render("product", { product });
    }
  });
});

// Fazendo o update, para ficar mais didatico, preciso do SELECT junto, para o usuario consultar os dados que ele irá digitar

app.get("/products/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const sql = `SELECT * FROM product WHERE idproduct=${id}`;

  connection.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    } else {
      const product = data[0];
      res.render("editproduct", { product });
    }
  });
});

// Agora eu criarei minha rota POST para mandar os updates para o banco
app.post('/products/update', (req, res) => {
  const id = req.body.id
  const name = req.body.name
  const price = req.body.price
  const sql = `UPDATE product SET nameproduct = '${name}', priceproduct = '${price}' WHERE idproduct=${id}`
  connection.query(sql, (err) => {
    if (err) {
      console.log(err)
      return
    } else {
      res.redirect('/products')
    }
  })
})

// Criarei minha rota de POST que será apenas uma ação de DELETAR os dados
// Preciso de um id para deletar, pois senao deletarei minha tabela
app.post('/products/delete/:id', (req,res) => {
  const id = req.params.id

  const sql = `DELETE FROM product WHERE idproduct=${id}`

  connection.query(sql, (err) => {
    if (err) {
      console.log(err)
      return
    } 

    res.redirect('/products')

  })

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
