const mongoose = require('mongoose')

var edicaoSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    ano: { type: Number, required: true },
    organizacao: { type: String, required: true },
    vencedor: { type: String, default: "" }
})


module.exports = mongoose.model('edicao', edicaoSchema, 'edicoes')