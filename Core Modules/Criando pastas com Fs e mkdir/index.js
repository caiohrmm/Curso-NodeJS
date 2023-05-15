// Como crio diretórios/pastas com o fs ?

const fs = require('fs')


const conta = 8


if (4 + 4 === conta && !fs.existsSync('./Teste')) {
    fs.mkdirSync('./Teste')
    console.log('Diretório criado com sucesso!')
} else if (fs.existsSync('./Teste')) {
    console.log('Não foi possível criar o diretorio! Já existe!!')
}
else {
    console.log('Não foi possível criar o diretorio!')
}