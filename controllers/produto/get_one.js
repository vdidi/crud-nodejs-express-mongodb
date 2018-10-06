const mongoose = require('mongoose')
const Produto = mongoose.model('Produto')

exports.get_one = (req, res) => {
    if(req.params.id){
        Produto.findById(req.params.id)
        .then((data)=>{
            if(data){
                res.send(data)
            }else{
                res.send('This product does not exist')
            }
        })
        .catch((err)=>{
            res.send(`Wrong parameters ${err}`)
        })
    }else{
        res.send(400,'Missing id parameter')
    }
}