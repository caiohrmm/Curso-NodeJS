// O comando mais basico é o console.log

const nome = ["Caio", "Henrique"]

console.log(nome)

/* O console.count() tem um contador embutido, que no final da impressao faz a contagem de quantas vezes ele foi
 executado.*/

console.count(nome)
// console.count(nome)
// console.count(nome)
// console.count(nome)

/* Ctrl + K + C => Comenta bloco de código */
/* Ctrl + K + U => Descomenta bloco de código */

/* Uma forma de interpolar nao muito comum é com*/
// %s para String
// %d ou %i para Number
// %f para Floating points
// %o para um Object
// %j para um JSON

console.log('Meu nome é %s e meu sobrenome é %s', nome[0],nome[1])


// Clear no console => console.clear()

// Zera o console após 1s
setTimeout(() => console.clear() , 1000)
