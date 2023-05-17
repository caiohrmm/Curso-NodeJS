// Requirir o express
const express = require('express')

// Executá-lo em uma variavel
const app = express()
// Requirir path
const path = require('path')

// Como acessar a pasta dos meus templates/htmls ?
const basePath = path.join(__dirname, 'templates')
// __dirname -> Meu diretório atual


// Porta para acessar
const port = 3000

// Agora comecarei minha aplicação

// Método get -> O usuário visualizar a pagina já é um GET, nele terei 2 parametros

// Lendo o body
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

// Importando o módulo de rotas para nomes
const nomesRoutes = require('./nomes')

app.use('/nomes', nomesRoutes) // Para chamar o módulo -> indico a base das rotas -> /nomes e a pasta onde elas estao

// A url principal -> / Sempre fica em último na listagem das URL's por que senao todas cairiam nela.
app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})


// Para eu abrir o servidor basta eu dar um listen no meu app com a porta e se quiser uma funcao de callback
app.listen(port, () => console.log(`Servidor aberto na porta ${port} ... `))

