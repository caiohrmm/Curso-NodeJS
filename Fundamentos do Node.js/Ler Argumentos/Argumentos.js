console.log(process.argv)

const args = process.argv.slice(2)

console.log(args)

const idade = args[0].split("=")[1]

console.log(idade)

// De acordo com um argumento que eu colocar em minha linha de comando, consigo acessá-lo e manipulá-lo
// através do process.argv que divide tudo em um array.