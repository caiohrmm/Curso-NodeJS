// Serve para extrair informacoes do sistema operaciona

const os = require('os')

console.log(os.cpus()) // Mostra os cpus atuais da máquina

console.log(os.freemem()) // Mostra a memória RAM livre atual da máquina em bytes

console.log(os.type()) // Mostra o tipo do meu S.O -> Windows, MAC, Linux

console.log(os.homedir()) // meu diretorio de home do meu S.O