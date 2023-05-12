const chalk = require('chalk')

// O chalk serve para colorir as palavras do console

const firstName = "Caio"
const lastName = "Martins"

console.log(chalk.bgGray.green(`Olá ${chalk.red(firstName)} ${chalk.red(lastName)}`))


// Passando somente a cor -> Altero o foreground
// chalk.bgRed -> Altero o background
// chalk.bgGreen.black -> Altero a cor de fundo e a de foreground