// throw cria um Erro

// O try catch serve para tentar realizar alguma coisa e se nao me der certo eu consigo tratar meu erro no catch

const nome = "Caio"
//const idade = 18
const idade = "18"

if (nome === "Caio" && idade === 18) {
    console.log(`Prazer ${nome} ! Você tem ${idade} anos `)
} else {
    console.log("Tente novamente!")
    throw new Error("Não foi possível descrever o usuário.")
}

