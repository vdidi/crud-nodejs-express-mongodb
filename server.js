/**
 * 
 * Arquivo: server.js
 * Descrição: 
 * Author: Vitor Hugo Ramos
 * Data de criação: 21/05/2018
 * 
 */

 //Configurar o setup da aplicação
 //Chamadas dos pacote
 require('dotenv').config()
 const env = process.env.NODE_ENV
 const port = process.env.PORT || 3001
 const express = require('express')
 const app = express()
 const bodyParser = require('body-parser')
 const mongoose = require('mongoose')

 const Models = require('./models/index')

 if(env === "test")
    app.db_url = process.env.MONGO_URL_TEST || "mongodb://localhost:27017/test"
 else
    app.db_url = process.env.MONGO_URL

 mongoose.Promise = Promise

 //conexão com  banco de dados
 mongoose.connect(app.db_url, {
     promiseLibrary: global.Promise
 })
 const db = mongoose.connection

 //caso aconteça algum erro
 db.on('error', console.error.bind(console, 'connection error:'))

 //abrindo conexão

 db.once('open', () => {
     if(env !== "test")
        console.log(`Connected to Mongo at : ${new Date()}`)
 })

 //setando prefixo da api
 app.APIROOTPATH = '/api'

 app.use(bodyParser.json())
 
 app.all('/*', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept,Authorization')
    res.setHeader('Access-Control-Allow-Credentials', true)
    if (req.method === 'OPTIONS')
        res.status(200).end()
    else
        next()
})
 
//carrega as rotas da API
app.use(app.APIROOTPATH, require('./routes/'))

//Manda uma resposta 404 se um recurso não é encontrado
app.use((req, res) => {
    res.status(404).send('Not found')
})

//status do servidor
const server = app.listen(port, () => {
    if(env !== "test")
        console.log(`API RESTful started on port ${server.address().port}`)
})

module.exports = app
