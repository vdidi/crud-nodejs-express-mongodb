/**
 * 
 * Arquivo: produto.js
 * Descrição: arquivo responsável onde trataremos o modelo da classe 'Produto'
 * Author: Vitor Hugo Ramos
 * Data de criação: 21/05/2018
 * 
 */

 var mongoose = require('mongoose');

 var Schema = mongoose.Schema;

 /**
  * Produto:
  * id: int
  * nome: string
  * preco: number
  * descricao: string
  */

  var ProdutoSchema = new Schema({
    nome: String,
    preco: Number,
    descricao: String
  });

  module.exports = mongoose.model('Produto', ProdutoSchema);
