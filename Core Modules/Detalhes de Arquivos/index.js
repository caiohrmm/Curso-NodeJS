const fs = require ('fs')

fs.stat('arquivo.txt', function(err, stats){
    if (err){
        console.log('Arquivo inexistente!')
        return
    }
    console.log(stats.size + "kb") // Verifico o tamanho do arquivo
    console.log(stats.isFile()) // Verifico se é um arquivo
    console.log(stats.isDirectory()) // Verifico se é um diretorio
    console.log(stats.ctime) // Verifico sua data de criação
    console.log(stats.isSymbolicLink()) // Verifico se é um link simbólico
})