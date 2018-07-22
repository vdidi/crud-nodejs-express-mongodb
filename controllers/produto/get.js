const mongoose = require('mongoose')
const Produto = mongoose.model('Produto')

exports.get = (req, res) => {
    Produto.find()
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        res.send({message: err.message})
    })
}