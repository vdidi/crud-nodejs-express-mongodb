const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const ProdutoSchema = new Schema({
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