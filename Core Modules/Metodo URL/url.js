const url = require ('url')

const endereco = 'https://www.americanas.com.br/busca/bola-de-futebol'

// Agora preciso decompor minha url

const parsedUrl = new url.URL(endereco)

console.log(parsedUrl.host) // Retira o host do link -> www.google.com.br
console.log(parsedUrl.pathname) // Retira o que vem depois do host -> /busca
console.log(parsedUrl.search) // O que vem depois da ?
console.log(parsedUrl.searchParams) // pega os parametros