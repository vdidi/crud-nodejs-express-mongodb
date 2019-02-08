const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.post= (req, res) => {
    if(req.body){
        const user = new User(req.body)
        user.save()
        .then((data) => {
            res.status(201).send(data)
        })
        .then((err) => {
            res.status(400).send(err)
        })
    }
}