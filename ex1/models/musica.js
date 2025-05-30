const mongoose = require('mongoose')

var musicaSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    edicaoId: { type: String, required: true },
    titulo: { type: String, required: true },
    pais: { type: String, required: true },
    link: { type: String, default: "" },
    compositor: { type: String, default: "" },
    interprete: { type: String, default: "" },
    letra: { type: String, default: "" }
})

module.exports = mongoose.model('musica', musicaSchema, 'musicas')