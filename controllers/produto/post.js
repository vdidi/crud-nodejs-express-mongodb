const mongoose = require('mongoose')
const Produto = mongoose.model('Produto')

exports.post = (req, res) =>{
    const produto = new Produto(req.body)
    produto.save()
    .then((result) => {
        res.send({message: "Produto cadastrado com sucesso!", result})
    })
    .catch((err) => {
        res.send({message: "Ocorreu um erro ao cadastrar o produto!", err})
    })
}