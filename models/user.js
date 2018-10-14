const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-beautiful-unique-validation')
const sha256 = require('sha256')

const validatePassword = (password) => {
    return password.lenght >= 6
}

const encryptPassword = (password) => {
    return sha256(password+process.env.SEED)
}

const UserSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    emai: {
        type: String,
        required: true,
        error: 'Erro de validação: esse e-mail já existe ({VALUE})',
    },
    password: {
        type: String,
        required: true,
        validate: [validatePassword, 'Sua senha precisa conter mais que 6 caracteres']
    }
}, {versionKey:false})

UserSchema.plugin(uniqueValidator)

UserSchema.pre('save', (next) => {
    this.password = this.encryptPassword(this.password)
    next()
})

module.exports = mongoose.model('User', UserSchema)