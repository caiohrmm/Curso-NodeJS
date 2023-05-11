// Costuma-se chamar o nome da variavel com o mesmo nome do coremodule.

const path = require ('path')

const extensao = path.extname("ArquivoDeTexto.txt")

// Esse método consegue extrair a extensao do arquivo dinamicamente.
console.log(extensao)