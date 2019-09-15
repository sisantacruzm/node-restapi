
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema

let categoriaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la categoria es necesario'],
    },
    estado: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Categoria', categoriaSchema)