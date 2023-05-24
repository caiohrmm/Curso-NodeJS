const express = require('express')

const router = express.Router()

// Importando meu controller
const ThoughtController = require('../controllers/ThoughtController')

// Importando meu helper
const checkAuth = require('../helpers/auth').checkAuth

router.get('/dashboard', checkAuth, ThoughtController.dashboard) // O middleware será executado sempre que a rota for acessada.
router.get('/', ThoughtController.showThoughts)

module.exports = router