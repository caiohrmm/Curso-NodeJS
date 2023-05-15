// Agora irei aprender a juntar o metodo http e o url

const http = require('http')

// Defino meu http -> Para criar um servidor, precisarei de uma porta e de um metodo de create

const port = 3000

// O server precisa de dois parametros -> req de requisição e res de resposta
// Ou seja, deve haver a troca de requisicoes do usuario e resposta do servidor.
const server = http.createServer((req,res) => {

    // Preciso parsear a URL da req para conseguir acessá-la quando a mesma chegar.

    const urlInfo = require('url').parse(req.url, true)

    // Agora pra eu acessar um dado
    const name = urlInfo.query.name
    const age = urlInfo.query.age

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')

    // Preciso fazer a condicional aqui.
    if (!name && !age) {
        res.end('<h1> Digite seu nome e sua idade </h1><form method= "GET" ><input type="text" name="name" placeholder="Digite seu nome..."/> <input type="text" placeholder="Digite sua idade..." name="age"/><input type="submit" value="Enviar"/></form>')
    }else {
        res.end(`<h1>Olá ${name}. Você tem ${age} anos!</h1>`)
    }
    // Preciso finalizar a minha escrita pois senao seria realizada infinitamente
} )

server.listen(port, () => {
    console.log('Servidor rodando na porta '+port )
})
// Para criar o servidor preciso adicionar a porta para meu listen.