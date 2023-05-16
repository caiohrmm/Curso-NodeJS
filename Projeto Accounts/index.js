// Requirindo módulos externos do npm
const chalk = require("chalk");
const inquirer = require("inquirer");

// Requirindo core modules
const fs = require("fs");
const { parse } = require("path");

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
      } else if (action === "Consultar Saldo") {
        checkBalance();
      } else if (action === "Realizar Depósito") {
        deposit();
      } else if (action === "Sacar") {
      } else if (action === "Sair") {
        inquirer
          .prompt([
            {
              type: "list",
              name: "confirmQuit",
              message: `Tem certeza que deseja sair ?`,
              choices: ["Sim", "Não"],
            },
          ])
          .then((answer) => {
            const quit = answer["confirmQuit"];

            if (quit === "Sim") {
              console.log(
                chalk.bgBlueBright
                  .bold`Obrigado por utilizar o banco Accounts! Até a próxima...`
              );
            } else if (quit === "Não") {
              operation();
            }
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
}
// Preciso definir o type do meu prompt que no caso é -> list
// Nessa lista eu preciso de um enunciado definido pelo -> message
/* Os itens da minha lista, ou acoes do meu banco serao definidos
num array de escolhas */

// Criando função de criar conta
function createAccount() {
  console.log(chalk.bgGreen.red("Obrigado por utilizar nosso banco!"));
  console.log(chalk.bgGreen("Insira alguns dados para criar sua conta!"));
  buildAccount();
}

// Criando função de construção da conta -> arquivo.json
function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite seu nome: ",
      },
      {
        name: "account",
        message: "Digite um nome para sua conta: ",
      },
    ])
    .then((answer) => {
      const account = answer["account"];
      const userName = answer["accountName"];
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
            if (!fs.existsSync("Accounts")) {
              fs.mkdirSync("Accounts");
            }

            if (fs.existsSync(`Accounts/${account}.json`)) {
              console.log(
                chalk.red(
                  "Essa conta já existe em nosso banco... Tente novamente!"
                )
              );
              buildAccount();
            } else {
              fs.writeFileSync(
                `Accounts/${account}.json`,
                '{"balance":0}',
                (err) => console.log(err)
              );

              console.log(
                chalk.greenBright(
                  `Parabéns ${userName}. Você criou a sua conta no banco Accounts!`
                )
              );
              operation();
            }
          } else {
            console.log(
              chalk.bgRed.blackBright(
                "Voltando para a tela de recepção de dados para criação de conta..."
              )
            );
            buildAccount();
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

// Criando função de depósito

function deposit() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite o nome da sua conta: ",
      },
    ])
    .then((answer) => {
      const account = answer["accountName"];
      if (!checkAccount(account)) {
        return deposit();
      } else {
        inquirer
          .prompt([
            {
              name: "amount",
              message: `Digite a quantia que você deseja depositar na conta ${chalk.bgBlueBright(
                account
              )}: `,
            },
          ])
          .then((answer) => {
            const amount = answer["amount"];
            addAmount(account, amount);
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
}

// Criando função que verifica se a conta existe ou não
function checkAccount(accountName) {
  if (fs.existsSync(`Accounts/${accountName}.json`)) {
    return true;
  } else {
    console.log(
      chalk.red.bold(
        `A conta ${chalk.bgBlueBright(accountName)} não existe no nosso banco.`
      )
    );
    return false;
  }
}

// Criando uma funçao para adicionar fundos a minha conta

function addAmount(accountName, amount) {
  // Para receber esse account, preciso pegar meu arquivo json da pasta accounts por meio de outra funcao
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(
      chalk.red("Não foi possível verificar essa quantia. Tente novamente...")
    );
    return deposit();
  } else {
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance); // Alterando o valor do balance -> convertendo de string para float e somando ao valor que já tem adicionado.

    fs.writeFileSync(
      `Accounts/${accountName}.json`,
      JSON.stringify(accountData),
      (err) => console.log(err)
    );

    console.log(
      chalk.greenBright(
        `Depósito realizado com sucesso! Foi adicionado um valor de R$ ${amount} na conta ${accountName}`
      )
    );
    operation();
  }
}

function getAccount(accountName) {
  // Essa funcao transformará meu arquivo json em objeto javascript
  const accountJSON = fs.readFileSync(`Accounts/${accountName}.json`, {
    encoding: "utf8",
    flag: "r",
  });
  return JSON.parse(accountJSON); // Converte o JSON em Objeto JavaScript
}

// Criando função para consultar saldo.
function checkBalance() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite o nome da sua conta: ",
      },
    ])
    .then((answer) => {
      const account = answer["accountName"];
      if (!checkAccount(account)) {
        return checkBalance();
      } else {
        const checkBalanceAccount = getAccount(account);
        const balance = checkBalanceAccount.balance
        console.log(chalk.greenBright(`Olá ${account} ! Você possui R$ ${chalk.red(balance)} em sua conta.`))
        operation()
      }
    })
    .catch((err) => console.log(err));
}
