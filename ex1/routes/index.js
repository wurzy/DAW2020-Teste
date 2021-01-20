var express = require('express');
var router = express.Router();
var Batismo = require('../controllers/batismo')

/* GET home page. */
router.get('/batismos', function(req, res, next) {
  if(req.query.ano && req.query.ano.match(/^[0-9]+$/)){
    Batismo.lookUpYear(req.query.ano)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
  }
  else {
    Batismo.list()
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
  }
});

router.get('/batismos/batisado', function(req, res, next) {
  Batismo.list(req.params.id)
    .then(dados => {
      var lista = []
      dados.forEach(batizado => {
        var title = batizado.title.split(/Registo de batismo n\.º [0-9]+: /)[1].split(/\./)[0]
        if (!(title in lista)){
          lista.push(title)
        }
      })
      lista.sort((a,b) => {
        return ''+a.localeCompare(b,'pt')
      })
      res.status(200).jsonp(lista)
    })
    .catch(e => res.status(500).jsonp({error: e}))
});

router.get('/batismos/progenitores', function(req, res, next) {
  Batismo.listFields()
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});


router.get('/batismos/:id', function(req, res, next) {
  Batismo.lookUp(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

module.exports = router;
