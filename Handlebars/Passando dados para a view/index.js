const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

const port = 3000

// Setup handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

const user = {
    name: "Caio",
    age: 18,
}

const car = {
    brand: "Ford",
    year: 2000,
    model: "Ford KA"
}



// Definir minha rota home
app.get('/', (req, res) => {
    res.render('home', { user, carro: car })
})

// Recebo o usuário na minha home e depois acesso ele no front com {{}}
// Posso enviar vários objetos é só dar , e adicionar mais.


app.listen(port, () => console.log(`Servidor rodando na porta ${port} !`))