// Adicionando meus modulos externos
const chalk = require ('chalk')
const inquirer = require ('inquirer')

// Estruturando meu inquirer
inquirer.prompt([{
    name: 'Nome',
    message: 'Qual seu nome: ',
}, {
    name: 'Idade',
    message: 'Qual sua idade: ',
}]).then((respostas) => {
        console.log(chalk.bgYellow.black(`Olá ${respostas.Nome}, você tem ${respostas.Idade} anos.`))
}).catch((err) => console.log("Erro: "+ err))