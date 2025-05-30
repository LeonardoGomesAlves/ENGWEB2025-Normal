const Edicao = require('../models/edicao')
const Musica = require('../models/musica')

module.exports.getEdicoes = () => {
    return Edicao
        .find({}, {_id: 0, ano: 1, organizacao: 1, vencedor: 1})
        .sort({ano: 1})
        .exec()
}

module.exports.getEdicoesWithId = () => {
    return Edicao
        .find()
        .exec()
}

module.exports.getEdicaoById = async (id) => {
    return Edicao
        .aggregate([
            {
                $match: { _id: id }
            },
            {
                $lookup: {
                    from: "musicas",
                    localField: "_id",
                    foreignField: "edicaoId",
                    as: "musicas"
                }
            }
        ])
        .exec()
}

module.exports.getEdicoesByOrganizador = (organizador) => {
    return Edicao
        .find({organizacao: organizador}, {_id: 0, ano: 1, organizacao: 1, vencedor: 1})
        .sort({ano: 1})
        .exec()
}


module.exports.getEdicoesByOrganizadorWithId = (organizador) => {
    return Edicao
        .find({organizacao: organizador})
        .exec()
}

module.exports.getPaisesOrganizadores = () => {
    return Edicao
        .aggregate([
            {
                $group: {
                    _id: "$organizacao",
                    anos: { $push: "$ano" }
                }
            },
            {
                $project: {
                    _id: 0,
                    pais: "$_id",
                    anos: 1
                }
            },
            {
                $sort: { pais: 1 }
            }
        ])
        .exec()
}

module.exports.getPaisesVencedores = () => {
    return Edicao
        .aggregate([
            {
                $match: { vencedor: { $ne: "" } }
            },
            {
                $group: {
                    _id: "$vencedor",
                    anos: { $push: "$ano" }
                }
            },
            {
                $project: {
                    _id: 0,
                    pais: "$_id",
                    anos: 1
                }
            },
            {
                $sort: { pais: 1 }
            }
        ])
        .exec()
}

module.exports.getInterpretes = () => {
    return Musica
        .aggregate([
            {
                $match: { interprete: { $ne: "" } }
            },
            {
                $group: {
                    _id: {
                        interprete: "$interprete",
                        pais: "$pais"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    nome: "$_id.interprete",
                    pais: "$_id.pais"
                }
            },
            {
                $sort: { nome: 1 }
            }
        ])
        .exec()
}

module.exports.insertEdicao = (edicaoData) => {
    const novo = new Edicao(edicaoData)
    return novo.save()
}

module.exports.deleteEdicao = (id) => {
    return Edicao
            .findByIdAndDelete(id)
            .exec()
}

module.exports.updateEdicao = (id, edicao) => {
    return Edicao
        .findByIdAndUpdate(id, edicao, {new : true})
        .exec()
}

module.exports.getMusicasByEdicao = (edicaoId) => {
    return Musica
        .find({ edicaoId: edicaoId })
        .exec()
}

module.exports.getMusicasByPais = (pais) => {
    return Musica
        .find({pais: pais})
        .exec()
}