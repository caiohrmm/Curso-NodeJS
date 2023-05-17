const express = require('express')

const path = require('path')

const basePath = path.join(__dirname, 'templates')
console.log(basePath)
const app = express()

const port = 5000

// Arquivos estáticos
app.use(express.static('public'))

// Lendo o body
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

// Rota de produtos
const products = require('./Produtos')
app.use('/products', products)

app.get('/', (req, res) => {    
    res.sendFile(`${basePath}/index.html`)

})

// Página 404

app.listen(port, () => console.log(`Servidor aberto na porta ${port}`))