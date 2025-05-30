var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:25000/edicoes/withId')
    .then(resp => {
      var edicoes = resp.data
      res.render('index', {
        title: 'Eurovisão - Lista de Edições',
        edicoes: edicoes
      })
    })
    .catch(error => {
      console.log(error);
      res.render('error', {error: errcor})
    })
});

/* GET edition page */
router.get('/:id', function(req, res, next) {
  axios.get(`http://localhost:25000/edicoes/${req.params.id}`)
    .then(edicaoResp => {
      var edicao = edicaoResp.data
      
      axios.get(`http://localhost:25000/musicas?edicao=${req.params.id}`)
        .then(musicasResp => {
          var musicas = musicasResp.data
          
          res.render('edicao', {
            title: `Edição ${edicao[0].ano} - Eurovisão`,
            edicao: edicao,
            musicas: musicas
          })
        })
        .catch(error => {
          console.log(error);
          res.render('error', {error: error})
        })
    })
    .catch(error => {
      console.log(error);
      res.render('error', {error: error})
    })
});

/* GET country page */
router.get('/paises/:pais', function(req, res, next) {
  var nomePais = req.params.pais;
  
  axios.get(`http://localhost:25000/musicas?pais=${nomePais}`)
    .then(musicasResp => {
      var musicasPais = musicasResp.data
      
      axios.get('http://localhost:25000/edicoes/withId')
        .then(edicoesResp => {
          var todasEdicoes = edicoesResp.data
          
          axios.get(`http://localhost:25000/edicoes/withId?org=${nomePais}`)
            .then(edicoesOrgResp => {
              var edicoesOrganizadas = edicoesOrgResp.data

              console.log(edicoesOrganizadas)
              
              var participacoes = musicasPais.map(musica => {
                var edicao = todasEdicoes.find(ed => ed._id === musica.edicaoId)
                return {
                  ...musica,
                  ano: edicao ? edicao.ano : '-',
                  venceu: edicao && edicao.vencedor === nomePais ? 'Sim' : 'Não'
                }
              }).sort((a, b) => a.ano - b.ano)
              
              res.render('pais', {
                title: `${nomePais} - Eurovisão`,
                pais: nomePais,
                participacoes: participacoes,
                edicoesOrganizadas: edicoesOrganizadas
              })
            })
            .catch(error => {
              console.log(error);
              res.render('error', {error: error})
            })
        })
        .catch(error => {
          console.log(error);
          res.render('error', {error: error})
        })
    })
    .catch(error => {
      console.log(error);
      res.render('error', {error: error})
    })
});


module.exports = router;
