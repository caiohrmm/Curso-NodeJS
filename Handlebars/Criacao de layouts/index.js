const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

const port = 3000

// Setup handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


// Definir minha rota home
app.get('/', (req, res) => {
    res.render('home')
}) 

// Criando layout -> Serve para reaproveitar codigo entre as paginas.
// Criar uma pasta layouts em views
// De acordo com a pagina o body sempre muda por conta do {{{body}}} mas o que está fora dele continua para todas as paginas
// Muito util para deixar uma navbar e um footer e so mexer no que tem de conteudo da pagina!

// Todos meus templates de HTML ficarao na pasta views e terao .handlebars inves de .html

app.listen(port, () => console.log(`Servidor rodando na porta ${port} !`))