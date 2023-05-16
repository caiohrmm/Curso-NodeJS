// Requirindo módulos externos do npm
const chalk = require("chalk");
const inquirer = require("inquirer");

// Requirindo core modules
const fs = require("fs");

// Criando funçao de operaçao

function operation() {
  console.log(
    chalk.bgWhite.black(
      "Bem vindo ao banco do projeto Accounts desenvolvido por Caio Henrique"
    )
  );

  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "Qual operação você deseja realizar ?",
        choices: [
          "Criar Conta",
          "Consultar Saldo",
          "Realizar Depósito",
          "Sacar",
          "Sair",
        ],
      },
    ])
    .then((answer) => {
        const action = answer['action'] // Me retorna em string a ação que o usuário escolheu
    })
    .catch((err) => console.log(err));
}

// Preciso definir o type do meu prompt que no caso é -> list
// Nessa lista eu preciso de um enunciado definido pelo -> message
/* Os itens da minha lista, ou acoes do meu banco serao definidos
num array de escolhas */

operation();
