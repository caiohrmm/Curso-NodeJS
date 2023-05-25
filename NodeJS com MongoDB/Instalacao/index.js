const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

const connection = require("./db/connection");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.listen(3000, () => console.log("Servidor aberto na porta 3000"));
