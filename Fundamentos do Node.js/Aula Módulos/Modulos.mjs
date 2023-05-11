// O que são módulos? 

// Módulos são scripts reaproveitaveis, que possuem 3 divisoes 

/* 
    Internos -> Modulos que nos fazemos
    Core modulos -> Ex: Filesystem que vem com o node
    Externos -> Que instalamos via npm
*/


// 1 - Módulos Internos

/* Exporto com module.exports e importo com require */

module.exports = {
    soma(a, b, c) {
        return a + b + c
    }
}



