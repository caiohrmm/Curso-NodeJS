const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

const port = 3000

// Setup handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


// Definir minha rota home
app.get('/', (req, res) => {
    res.render('home', {layout: false})
}) // Por enquanto ainda não tenho um layout

// Todos meus templates de HTML ficarao na pasta views e terao .handlebars inves de .html

app.listen(port, () => console.log(`Servidor rodando na porta ${port} !`))