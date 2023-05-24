const express = require('express')

const router = express.Router()

// Importando meu controller
const ThoughtController = require('../controllers/ThoughtController')

router.get('/', ThoughtController.showThoughts)

module.exports = router