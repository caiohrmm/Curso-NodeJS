const path = require('path')

// O path trabalha com os caminhos dos meus arquivos

// Como se fossem as url's do S.O

const caminhoPath = 'C:/users/Desktop/Fortnite.exe'

console.log(path.dirname(caminhoPath)) // -> Diretorio no caso C:/users/desktop
console.log(path.basename(caminhoPath)) // -> Nome do meu arquivo que será acessado
console.log(path.extname(caminhoPath)) // -> Extensao do meu arquivo
