// O módulo FS me permite fazer muitas coisas com arquivos, até mesmo ler HTML dentro do meu servidor

const http = require('http')

const fs = require('fs')


const port = 3000

const server = http.createServer((req,res) => {

    // Leio meu arquivo index.html, ai eu tenho os parametros de dados e de erro.
    // Passo no writeHead o status code e o tipo de conteudo.
    // Escrevo meus dados na pagina e encerro a entrada de dados.

    fs.readFile('index.html', function(err,data) {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(data)
        return res.end()
    })
})
server.listen(port, () => {
    console.log('Servidor rodando na porta '+port )
})

