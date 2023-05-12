const http = require('http')

// Defino meu http -> Para criar um servidor, precisarei de uma porta e de um metodo de create

const port = 3000

// O server precisa de dois parametros -> req de requisição e res de resposta
// Ou seja, deve haver a troca de requisicoes do usuario e resposta do servidor.
const server = http.createServer((req,res) => {
    res.statusCode = 200
    res.setHeader('Contenty-Type', 'text/html')
    res.end('<h1>Ola Mundo HTML</h1>')
    // Preciso finalizar a minha escrita pois senao seria realizada infinitamente
} )

server.listen(port, () => {
    console.log('Servidor rodando na porta '+port )
})
// Para criar o servidor preciso adicionar a porta para meu listen.