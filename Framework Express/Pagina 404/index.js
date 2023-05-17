// Requirir o express
const express = require('express')

// Executá-lo em uma variavel
const app = express()
// Requirir path
const path = require('path')

// Como acessar a pasta dos meus templates/htmls ?
const basePath = path.join(__dirname, 'templates')
// __dirname -> Meu diretório atual

// Atribuir os estaticos -> css, js
app.use(express.static('public'))

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

// Como faço para dar o erro 404 -> Página inexistente
// Quando o usuario acessa uma rota que nao existe no meu sistema. Preciso coloca-lo numa tela de erro 404
// Usarei um middleware que, apos tentar entrar em todas as rotas e nao der certo, ele cai nessa
app.use((req, res, next) => {
    res.status(404).sendFile(`${basePath}/404.html`)
})

// Para eu abrir o servidor basta eu dar um listen no meu app com a porta e se quiser uma funcao de callback
app.listen(port, () => console.log(`Servidor aberto na porta ${port} ... `))

