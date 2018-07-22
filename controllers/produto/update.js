const mongoose = require('mongoose')
const Produto = mongoose.model('Produto')

exports.update = (req, res) => {
    Produto.findById(req.params.id, (err, produto) => {
        if(err)
            res.send({message: "Erro ao buscar o produto a ser atualizado", err})
        
        if(req.body.nome) produto.nome = req.body.nome
        if(req.body.preco) produto.preco = req.body.preco
        if(req.body.descricao) produto.descricao = req.body.descricao

        produto.save()
        .then((result) => {
            res.send({message: "Produto atualizado com sucesso!", result})
        })
        .catch((err) => {
            res.send({message: "Erro ao atualizar o produto!"})
        })  
    })
}