// Usarei npm para baixar os modulos externos.

// Para isso, precisarei inicializar o npm dentro do meu projeto -> npm init

const minimist = require("minimist")

const args = minimist(process.argv.slice(2))

const nome = (args['nome'])
const idade = (args['idade'])

console.log(`Seu nome é ${nome} !!. E você tem ${idade} anos.`)