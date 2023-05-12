// Usarei npm para baixar os modulos externos.

// Para isso, precisarei inicializar o npm dentro do meu projeto -> npm init

const minimist = require("minimist")
const args = minimist(process.argv.slice(2))

// Importarei meu módulo interno
const calculo = require('./calculo').calculo

// Aqui terei meus dois valores que recebereirequire por argumento.
const valor1 = parseInt(args['valor1'])
const valor2 = parseInt(args['valor2'])
// Os valores no argumento vem como String, entao preciso ter cuidado na hora de realizar calculos e fazer a conversao

// Agora farei a interação com meu usuário.
console.log(`Você digitou os valores ${valor1} e ${valor2}. ${valor1} * ${valor2} = ${calculo(valor1,valor2)}`)