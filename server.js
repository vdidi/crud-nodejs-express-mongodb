/**
 * 
 * Arquivo: server.js
 * Descrição: 
 * Author: Vitor Hugo Ramos
 * Data de criação: 21/05/2018
 * 
 */

 //COnfigurar o setup da aplicação
 //Chamadas dos pacotes
 var express = require('express');
 var app = express();
 var bodyParser = require('body-parser');
 var mongoose = require('mongoose');
 var Produto = require('./app/models/produto');
 mongoose.Promise = global.Promise;


 //Conectando localmente:
 mongoose.connect('mongodb://localhost:27017/node-crud-api', {
     useMongoClient: true,
 });

 //Configuração da variável app para usar o "bodyParser()":
 app.use(bodyParser.urlencoded({ extended: true}));
 app.use(bodyParser.json());

 //Definindo uma porta onde será executada a nossa api:
 var port = process.env.port || 8000;

 // ======ROTAS DA API=======
 //Crianda uma instância das Rotas via express:
 var router = express.Router();

 router.use(function(req, res, next){
    console.log('algo está acotnencendo aqui...');
    next();
 });

 //Rota de exemplo:
 router.get('/', function(req, res){
    res.json({ message: 'Beleza! Bem vindo a nossa loja XYZ!' })
 });

 //API'S:
 //==================================================
 //Rotas que terminarem com '/produtos' irão servir para GET ALL & POST 
 router.route('/produtos')

    /**
     * 1) Método: Criar produto (acessar em: POST http://localhost:8000/api/produtos)*/
    .post(function(req,res){
        var produto = new Produto();

        //Aqui vamos setar os campos do produto (via request)
        produto.nome = req.body.nome;
        produto.preco = req.body.preco;
        produto.descricao = req.body.descricao;


        produto.save(function(error){
            if(error)
                res.send('Erro ao tentar salvar o produto: ' + error);

            res.json({message: 'Produto cadastrado com sucesso!'});
        });
    })
    
    /** 2) Selecionar todos os produtos (método GET em: http://localhost:8000/api/produtos) */
    .get(function(req, res){
        Produto.find(function(error, produtos){
            if(error)
                res.send('Erro ao tentar selecionar todos os produtos...: '+ error);
            res.json(produtos);
        });
    });

 //Rotas que irão terminar em '/produtos/:produto_id' (servir tanto para : GET, PUT & DELETE: id)
 router.route('/produtos/:produto_id')

    /** 3)Método: selecionar por Id: (acessar em: GET http://localhost:8000/api/produtos/:produto_id) */
    .get(function(req, res){
        //Função para poder selecionar determinado produto por Id - retorna erro se não encontrar
        Produto.findById(req.params.produto_id, function(error, produto){
            if(error)
                res.send('Erro ao tentar encontrar o produto por Id: ' + error);

            res.json(produto);
        });
    })
    /** 4) Método: Atualizar por Id: (acessar em: PUT http://localhost:8000/api/produtos/:produto_id) */
    .put(function(req, res){
        //1° passo: achar o Id do produto
        Produto.findById(req.params.produto_id, function(error, produto){
            if(error)
                res.send('Erro ao tentar encontrar o produto por Id: ' + error);
        //2° passo: atualizar os dados
            produto.nome = req.body.nome;
            produto.preco = req.body.preco;
            produto.descricao = req.body.descricao;
        //3° passo: salvar as propriedades
            produto.save(function(error){
                if(error)
                    res.send('Erro ao atualizar o produto' +error);
                res.json({message: 'Produto atualizado com sucesso!'});
            });
        });
    })
    /* 5) Método: Excluir por Id (acessar: http://localhost:8000/api/produtos/:produto_id) */
    .delete(function(req,res){
        Produto.remove({
            _id: req.params.produto_id
            }, function(error){
                if(error)
                    res.send('Id do produto não encontrado...:'+ error);
                
                    res.json({ message: 'Produto Excluído com sucesso!'})
            });
    });
 //Definindo um padrão das rotas, prefixadas:
 app.use('/api', router);

 //Iniciando servidor
 app.listen(port);
 console.log('Iniciando a app na porta ' + port);
