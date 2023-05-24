const User = require('../models/User') // Chamo o usuario para salva-lo no banco

const bcrypt = require('bcryptjs') // Para mandar as senhas ja criptografadas para o banco

module.exports = class AuthController {
    static login(req, res) {
        res.render('auth/login')
    }
    static register(req, res) {
        res.render('auth/register')
    }
    static async registerPost(req,res) {
        // Primeiro as validacoes
        const {username, email, password, confirmpassword} = req.body

        // Verificar se a senha colocada é igual a confirmada!

        if (password != confirmpassword) {
            // Enviar mensagem de erro para meu front
            req.flash('message', 'As senhas não são iguais. Tente novamente!')

            res.render('auth/register')

            return
        }

    }

}