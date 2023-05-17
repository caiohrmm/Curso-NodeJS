const express = require('express')
const router = express.Router()

const path = require('path')

const basePath = path.join(__dirname, '../templates')

// Rota para produtos
router.get('/', (req, res) => {
    res.sendFile(`${basePath}/products.html`)
})

router.get('/register', (req, res) => {
    res.sendFile(`${basePath}/cadastrarProduto.html`)
})

router.post('/save', (req, res) => {
    const nameProduct = req.body.nameProduct

    console.log(`Você está cadastrando o produto ${nameProduct}`)

    res.sendFile(`${basePath}/cadastrarProduto.html`)
})

module.exports = router