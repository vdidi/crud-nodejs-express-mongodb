const mongoose = require('mongoose')
const Produto = mongoose.model('Produto')

exports.update = (req, res) => {
    checkBody()
    .then((result) => {
        Produto.findByIdAndUpdate(req.params.id, result, {new: true, runValidators: true})
        .then((data) => {
            if(data){
                res.status(200).res(data)
            }else{
                res.status(400).res('Any product matches with this id')
            }
        })

    })
    function checkBody(obj){
        return new Promise((resolve, reject) => {
            let new_obj = {}
            if(obj.nome) new_obj.nome = obj.nome
            if(obj.preco) new_obj.preco = obj.preco
            if(obj.descricao) new_obj.descricao = obj.descricao
            resolve(new_obj)
        })
        
    }
}