const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

const port = 3000;

// Setup partials
const hbs = exphbs.create({
    partialsDir: ["views/partials"]
})

// Setup handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Estruturas de repetição -> é o each, tem a mesma sintaxe do if {{#each}} {{/each}} e os itens serao acessados por this
const cars = [
  {
    id: 1,
    name: "Ford KA",
  },
  {
    id: 2,
    name: "Palio",
  },
];
// Definindo a rota de dashboard

// Os partials sao tipo os components do React -> Crio um minitemplate que pode ser reutilizado em um template de rota quantas vezes eu quisers

app.get("/dashboard", (req, res) => {
  res.render("dashboard", { cars });
}); // Para pegar meu objeto no handlebars é com o this.atributo

// Definir minha rota home
app.get("/", (req, res) => {
  const user = {
    name: "Caio",
    age: 18,
  };

  const car = {
    brand: "Ford",
    year: 2000,
    model: "Ford KA",
  };

  const autenticado = true;

  res.render("home", { user, carro: car, auth: autenticado });
});

// O CSS com o handlebars é a mesma coisa porém se eu quiser aplicar um css para todas as páginas, basta aplicá-lo no layout

app.listen(port, () => console.log(`Servidor rodando na porta ${port} !`));
