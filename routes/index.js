const express = require('express')
const router = express.Router()

//rota principal
router.get('/', (req, res) => {
    res.send({message: 'API funcionando'})
})

//carregando todas as pastas aqui
require('./produto')(router)

module.exports = router