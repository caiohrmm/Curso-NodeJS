// Requirindo módulos externos do npm
const chalk = require("chalk");
const inquirer = require("inquirer");

// Requirindo core modules
const fs = require("fs");

operation();
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
      const action = answer["action"]; // Me retorna em string a ação que o usuário escolheu
      if (action === "Criar Conta") {
        createAccount();
      }
    })
    .catch((err) => console.log(err));
}
// Preciso definir o type do meu prompt que no caso é -> list
// Nessa lista eu preciso de um enunciado definido pelo -> message
/* Os itens da minha lista, ou acoes do meu banco serao definidos
num array de escolhas */

function createAccount() {
  console.log(chalk.bgGreen.red("Obrigado por utilizar nosso banco!"));
  console.log(chalk.bgGreen("Insira alguns dados para criar sua conta!"));
  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite seu nome: ",
      },
      {
        name: 'account',
        message: 'Digite um nome para sua conta: '
      }
    ])
    .then((answer) => {
      const account = answer["account"];
      const userName = answer["accountName"]
      inquirer
        .prompt([
          {
            type: "list",
            name: "confirmAccount",
            message: `Olá ${userName}! Sua conta se chamará: ${account}. Correto?`,
            choices: ["Sim", "Não"],
          },
        ])
        .then((answer) => {
          const confirm = answer["confirmAccount"];
          if (confirm === "Sim") {
            // Criar a conta
            if (!fs.existsSync('Accounts')) {
                fs.mkdirSync('Accounts')
            }

            if (fs.existsSync(`Accounts/${account}.json`)) {
                console.log(chalk.red('Essa conta já existe em nosso banco... Tente novamente!'))
                buildAccount()
            } else {
              fs.writeFileSync(`Accounts/${account}.json`, '{"balance":0}', ((err) => console.log(err)))

              console.log(chalk.greenBright(`Parabéns ${userName}. Você criou a sua conta no banco Accounts!`))
              operation()
            }
          } else {
            console.log(chalk.bgRed.blackBright('Voltando para a tela de recepção de dados para criação de conta...'))
            buildAccount()
        }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
