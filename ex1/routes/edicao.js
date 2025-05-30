var express = require('express');
var router = express.Router();
var Edicoes = require('../controllers/edicoes')


/* GET /edicoes - Lista todas as edições */
router.get('/edicoes', function(req, res, next) {
    if (req.query.org) { // /edicoes?org=Portugal
        Edicoes.getEdicoesByOrganizador(req.query.org)
            .then(data => res.status(200).jsonp(data))
            .catch(error => res.status(500).jsonp(error))
    } else {
        Edicoes.getEdicoes()
          .then(data => res.status(200).jsonp(data))
          .catch(error => res.status(500).jsonp(error))
    }
  });

router.post('/edicoes', function(req, res, next) {
    Edicoes.insertEdicao(req.body)
        .then(data => res.status(201).jsonp(data))
        .catch(error => res.status(500).jsonp(error))
});

router.get('/edicoes/withId', function(req, res, next) {
    if(req.query.org) {
        Edicoes.getEdicoesByOrganizadorWithId(req.query.org)
            .then(data => res.status(200).jsonp(data))
            .catch(error => res.status(500).jsonp(error))
    } else {
        Edicoes.getEdicoesWithId()
            .then(data => res.status(200).jsonp(data))
            .catch(error => res.status(500).jsonp(error))
    }
});

router.put('/edicoes/:id', function(req, res, next) {
    Edicoes.updateEdicao(req.params.id, req.body)
        .then(data => {
            if(data) {
                res.status(200).jsonp({message: "Edição atualizada com sucesso", atualizada: data})
            } else {
                res.status(404).jsonp({error: "Edição não encontrada"})
            }
        })
        .catch(error => res.status(500).jsonp(error))
});

router.delete('/edicoes/:id', function(req, res, next) {
    Edicoes.deleteEdicao(req.params.id)
        .then(data => {
            if(data) {
                res.status(200).jsonp({message: "Edição eliminada com sucesso", eliminada: data})
            } else {
                res.status(404).jsonp({error: "Edição não encontrada"})
            }
        })
        .catch(error => res.status(500).jsonp(error))
});
  
router.get('/edicoes/:id', async function(req, res, next) {
    try {
        const data = await Edicoes.getEdicaoById(req.params.id);
        if(data) {
            res.status(200).jsonp(data);
        } else {
            res.status(404).jsonp({error: "Edição não encontrada"});
        }
    } catch (error) {
        res.status(500).jsonp(error);
    }
});

router.get('/paises', function(req, res, next) {
    if(req.query.papel === 'org') {
        Edicoes.getPaisesOrganizadores()
            .then(data => res.status(200).jsonp(data))
            .catch(error => res.status(500).jsonp(error))
    } else if(req.query.papel === 'venc') {
        Edicoes.getPaisesVencedores()
            .then(data => res.status(200).jsonp(data))
            .catch(error => res.status(500).jsonp(error))
    } else {
        res.status(400).jsonp({error: "Parâmetro 'papel' obrigatório (org ou venc)"})
    }
});

router.get('/interpretes', function(req, res, next) {
    Edicoes.getInterpretes()
        .then(data => res.status(200).jsonp(data))
        .catch(error => res.status(500).jsonp(error))
});

router.get('/musicas', function(req, res, next) {
    if(req.query.pais) {
        Edicoes.getMusicasByPais(req.query.pais)
            .then(data => res.status(200).jsonp(data))
            .catch(error => res.status(500).jsonp(error))
    } else if(req.query.edicao) {
        Edicoes.getMusicasByEdicao(req.query.edicao)
            .then(data => res.status(200).jsonp(data))
            .catch(error => res.status(500).jsonp(error))
    } else {
        res.status(400).jsonp({error: "Parâmetro 'pais' ou 'edicao' obrigatório"})
    }
});


module.exports = router;
