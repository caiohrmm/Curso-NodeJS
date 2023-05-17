const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

const port = 3000;

app.use(express.static("public"));

// Setup handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

const products = [
  {
    id: 1,
    name: "Cadeira",
    price: 400,
    desc: "Uma bela cadeira marrom com rodas",
  },
  {
    id: 2,
    name: "Sofá",
    price: 1200,
    desc: "Uma belo sofá preto bem macio",
  },
  {
    id: 3,
    name: "Colchao",
    price: 4000,
    desc: "Um lindo colchão de casal perfeito para seu conforto!",
  },
  {
    id: 4,
    name: "Smartphone Galaxy M-51",
    price: 2000,
    desc: "Um celular completo para o dia-a-dia",
  },
];

// Ver produto específico
app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id) - 1;
  const productId = products[id]
  res.render("produtoesp", { productId });
});

// Rota products
app.get("/products", (req, res) => {
    res.render("produtos", { products });
});


app.listen(port, () => console.log(`Servidor aberto na porta ${port}!`));
