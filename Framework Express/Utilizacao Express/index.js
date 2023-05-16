// Requirir o express
const express = require('express')

// Executá-lo em uma variavel
const app = express()

// Porta para acessar
const port = 3000

// Agora comecarei minha aplicação

// Método get -> O usuário visualizar a pagina já é um GET, nele terei 3 parametros
/*
1 - Rota
2 - Requisição e resposta. Requisição é o usuário que envia, resposta é o que o servidor envia de volta pro usuário

*/

app.get('/', (req, res) => {
    res.send('Olá mundo Express')
})


// Para eu abrir o servidor basta eu dar um listen no meu app com a porta e se quiser uma funcao de callback
app.listen(port, () => console.log(`Servidor aberto na porta ${port} ... `))

