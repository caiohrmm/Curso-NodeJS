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

// Método get -> O usuário visualizar a pagina já é um GET, nele terei 3 parametros
/*
1 - Rota
2 - Requisição e resposta. Requisição é o usuário que envia, resposta é o que o servidor envia de volta pro usuário

*/

app.get('/nomes/add', (req, res) => {
    res.sendFile(`${basePath}/addname.html`)
})

// Lendo o body
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

// Com isso, toda a requisição feita no formulario é transformada em um obj javascript onde consigo pegar seus valores.

// Fazendo meu post
app.post('/nomes/save', (req, res) => {
    // Preciso recuperar o body do meu formulário aqui no meu post
    const name = req.body.name
    const age = req.body.age

    console.log(`Olá ${name} você tem ${age} anos`)
})



app.get('/nomes/:idnome', (req, res) => {
    res.sendFile(`${basePath}/nomes.html`)
    const idName = req.params.idnome
    console.log(`Estamos buscando pelo ${idName} nome do banco de dados.` )
})

app.get('/nomes', (req, res) => {
    res.sendFile(`${basePath}/nomes.html`)
})





// A url principal -> / Sempre fica em último na listagem das URL's por que senao todas cairiam nela.
app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})


// Para eu abrir o servidor basta eu dar um listen no meu app com a porta e se quiser uma funcao de callback
app.listen(port, () => console.log(`Servidor aberto na porta ${port} ... `))

