// Importando meus models
const Cake = require('../models/Cake')

module.exports = class CakeController {
    static async showCakes(req, res) {
        res.render('cakes/all')
    }
}