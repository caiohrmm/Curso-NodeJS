// Requirindo pacotes necessários
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')
const flash = require('express-flash')

// Instanciando express
const app = express()

