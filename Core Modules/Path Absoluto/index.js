const path = require('path')

// Como faço para pegar um path de um arquivo qualquer automaticamente?

console.log(path.resolve('arquivo.txt'))



// Como criar um path com o join

const midPath = 'arquivos'

const firstPath = 'arquivosCaioHenrique'

const finalPath = path.join('pastas', firstPath, midPath)

console.log(finalPath)

