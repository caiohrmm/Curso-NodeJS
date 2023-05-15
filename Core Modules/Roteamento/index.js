const http = require('http')

const fs = require('fs')

const url = require('url')

const port = 3000

const server = http.createServer((req, res) => {

    // Fazendo um método que faz um roteamento dinâmico
    // q -> Minha url -> localhost:3000
    const q = url.parse(req.url, true)

    // Quando eu renderizar um html ele fica no link depois do / ou seja -> localhost:3000/index.html
    const filename = q.pathname.substring(1)
    // A variavel filename retira o nome do arquivo da minha pagina sem a / entao fica somente index.html

    // Agora começo minha checkagem
    if (filename.includes('html')) { // filename precisa conter html como extensao para eu renderizar.
        if (fs.existsSync(filename)) { // Checko se filename existe.
            fs.readFile(filename, function (err, data) {

                if (err) {
                    console.log(err)
                    return
                }
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write(data)
                return res.end()
            })
        }
        else {
            fs.readFile('404.html', function (err, data) {
                if (err) {
                    console.log(err)
                    return
                }
                res.writeHead(404, { 'Content-Type': 'text/html' })
                res.write(data)
                return res.end()
            })
        }
    }
})

server.listen(port, () => {
    console.log('Servidor rodando na porta ' + port)
})
