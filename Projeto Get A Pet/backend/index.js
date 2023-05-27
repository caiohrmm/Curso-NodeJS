const express = require("express");

const cors = require("cors"); // Serve pra eu conseguir mandar requisicoes do front pra minha API no mesmo dominio.

const app = express();

const port = 4000 // Porta da API precisa ser diferente da do Front-End

// Configurar a resposta do JSON
// É a mesma ideia do body, mas na API só irei me comunicar em json
app.use(express.json());

// Resolver o CORS para liberar o frontend que estará hospedado na porta 3000 de acessar minha API.
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// Dados estáticos
app.use(express.static('public'))

// Rotas


app.listen(port,() => console.log(`API rodando na porta: ${port}`))