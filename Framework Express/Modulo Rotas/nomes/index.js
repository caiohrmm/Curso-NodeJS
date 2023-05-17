// Esse é o meu modulo de rotas para nomes

const express = require('express')
const router = express.Router() // Invés de app usarei o router
const path = require('path')

// Nao preciso do /nomes somente do atributo de cada rota
const basePath = path.join(__dirname, '../templates')

router.get('/add', (req, res) => {
    res.sendFile(`${basePath}/addname.html`)
})

// Com isso, toda a requisição feita no formulario é transformada em um obj javascript onde consigo pegar seus valores.

// Fazendo meu post
router.post('/save', (req, res) => {
    const name = req.body.name
    const age = req.body.age

    console.log(`Olá ${name} você tem ${age} anos`)
    res.sendFile(`${basePath}/addname.html`)
})

router.get('/:idnome', (req, res) => {
    res.sendFile(`${basePath}/nomes.html`)
    const idName = req.params.idnome
    console.log(`Estamos buscando pelo ${idName} nome do banco de dados.` )
})

router.get('/', (req, res) => {
    res.sendFile(`${basePath}/nomes.html`)
})

// Preciso exportar o modulo das rotas após isso
module.exports = router