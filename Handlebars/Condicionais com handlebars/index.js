const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

const port = 3000

// Setup handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')



// Definindo a rota de dashboard
app.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

// Definir minha rota home
app.get('/', (req, res) => {

    const user = {
        name: "Caio",
        age: 18,
    }
    
    const car = {
        brand: "Ford",
        year: 2000,
        model: "Ford KA"
    }

    const autenticado = false

    res.render('home', { user, carro: car, auth: autenticado })
})

// Recebo o usuário na minha home e depois acesso ele no front com {{}}
// Posso enviar vários objetos é só dar , e adicionar mais.


// Condicionais -> Preciso desenvolver todo meu back-end e mandar apenas uma variavel true ou false pro front
// Sua sintaxe é {{#if}} html {{/if}}

// A lógica é a seguinte -> Se o usuário tiver autenticado ele consegue acessar minha dashboard, caso contrario nao


app.listen(port, () => console.log(`Servidor rodando na porta ${port} !`))