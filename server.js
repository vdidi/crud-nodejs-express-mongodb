/**
 * 
 * Arquivo: server.js
 * Descrição: 
 * Author: Vitor Hugo Ramos
 * Data de criação: 21/05/2018
 * 
 */

 //Configurar o setup da aplicação
 //Chamadas dos pacotes
 require('dotenv').config()
 const env = process.env.NODE_ENV
 const port = process.env.PORT || 3001
 const express = require('express')
 const app = express()
 const bodyParser = require('body-parser')
 const mongoose = require('mongoose')
 const redis = require('redis')
 const client = redis.createClient();
 
 // if you'd like to select database 3, instead of 0 (default), call
 // client.select(3, function() { /* ... */ });
  
 client.on("error", function (err) {
     console.log("Error " + err);
 });
  
 client.set("string key", "string val", redis.print);
 client.hset("hash key", "hashtest 1", "some value", redis.print);
 client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
 client.hkeys("hash key", function (err, replies) {
     console.log(replies.length + " replies:");
     replies.forEach(function (reply, i) {
         console.log("    " + i + ": " + reply);
     });
     client.quit();
 });

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
