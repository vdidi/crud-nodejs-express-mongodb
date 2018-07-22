var mongoose = require('mongoose')
var Schema  = mongoose.Schema

var ProdutoSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true 
    },
    descricao: {
        type: String,
        required: false
    }
}, {versionKey: false})

module.exports = mongoose.model('Produto', ProdutoSchema)