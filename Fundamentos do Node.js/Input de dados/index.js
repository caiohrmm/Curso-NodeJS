/* Para utilizar o método readline, preciso importá-lo como coremodule */

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

// Essa é a estrutura do readline para ler e receber dados. Muito semelhante ao scanner do Java.

// Como faço a estrutura para perguntar e mandar resposta para o usuario? 

readline.question("Qual seu nome? ", (nome) => {
    if (nome) {
        console.log(`Seu nome é ${nome}!`)
        readline.close()
    } else {
        console.log("Nome indefinido.")
        readline.close()
    }
})


// O question espera dois valores => A pergunta e uma arrow function que trabalhará com a resposta.
// Preciso de um readline.close() para concluir a operação, se nao ele nao para o programa.