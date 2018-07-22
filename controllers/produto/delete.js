const mongoose = require('mongoose')
const Produto = mongoose.model('Produto')

exports.delete = (req, res) => {
    Produto.findByIdAndRemove(req.params.id)
    .then((data) => {
        res.send({message: `Produto ${data.id} foi removido com sucesso!`})
    })
    .catch((err) => {
        res.send({message: "Não foi possível remover o produto"})
    })
}