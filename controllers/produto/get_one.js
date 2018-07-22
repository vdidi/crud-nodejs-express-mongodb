const mongoose = require('mongoose')
const Produto = mongoose.model('Produto')

exports.get_one = (req, res) => {
    Produto.findById(req.params.id, (err, produto) => {
        if(err)
            res.send('Erro ao buscar o produto pelo ID', err)
        res.json(produto)
    })
}