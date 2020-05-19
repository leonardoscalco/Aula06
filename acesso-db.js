const express = require('express')
const restful = require('node-restful')
const server = express()
const mongoose = restful.mongoose
const bodyParser = require('body-parser')
const cors = require('cors')

// Conexão com o BD - Mongo DB
mongoose.Promise = global.Promise
mongoose.connect('mongodb://db/db-cadastro')

// Teste para saber se conseguimos acessar a app e BD
server.get('/', (req, res, next) => res.send('Olha ai nosso app do cadastro conectando com o mongodb!!'))

// Link entre a app e a web --> fazer os tratamentos devidos
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
server.use(cors())

// Mapeamento objeto documento usando JSON --> BD
const Usuario = restful.model('Usuario',{
    nome: { type: String, required: true}
})

// API: REST
Usuario.methods(['get', 'post', 'put', 'delete'])
Usuario.updateOptions({new: true, runValidators: true})

// Declaração do caminho do cadastro
Usuario.register(server, '/cadastro')

//Inicia o servidor
server.listen(2424) 

