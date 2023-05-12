const inquirer = require('inquirer');

// Para cada pergunta passarei um Objeto.
inquirer.prompt([{
    name: 'Nome',
    message: 'Qual seu nome: ',
}, {
    name: 'Idade',
    message: 'Qual sua idade: ',
}]).then((respostas) => {
    console.log(`Olá ${respostas.Nome}, você tem ${respostas.Idade} anos.`)


}).catch((err) => console.log(err))


// O prompt, precisa de várias coisas.

// As perguntas precisam de um nome e de uma mensagem, que no caso é a pergunta.
// Eu recebo as respostas numa arrow function no meu then.
// As respostas também vem em strings, entao caso eu queira trabalhar com numeros preciso de conversao.