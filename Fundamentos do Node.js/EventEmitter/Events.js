// O event emitter me possibilita criar eventos -> É um core module
const EventEmitter = require('events')

const eventEmitter = new EventEmitter()

// O evento precisa de uma mensagem para start dele e de uma função.
eventEmitter.on('disparar', () => setTimeout(() => console.log('Evento disparado'), 3000))

console.log('Antes do evento')

eventEmitter.emit('disparar')

console.log('Depois do evento')