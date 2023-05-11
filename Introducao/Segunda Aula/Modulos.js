// importando o file system para meu sistema

const fs = require('fs')

// O filesystem manipula arquivos, ou seja, le, escreve, cria, etc.

fs.readFile('Texto.txt', 'utf-8', (err, data) => {
    console.log(data)
})

// Posso configurar para pegar o erro tb

fs.readFile('Texto.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err)
    }else {
        console.log(data)
    }
})



