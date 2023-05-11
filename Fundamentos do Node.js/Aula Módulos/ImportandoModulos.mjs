// Quando import modulos eu nao preciso de extensao, apenas de identicador ./
const moduloInterno = require('./Modulos.mjs')

const soma = moduloInterno.soma

const multiplicacao = moduloInterno.multiplicacao


console.log(soma(1,2,3))

console.log(soma(123,2252,352))

