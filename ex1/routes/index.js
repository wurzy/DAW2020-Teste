var express = require('express');
var router = express.Router();
var Casamento = require('../controllers/casamentos')

/* GET home page. */
router.get('/casamentos', function(req, res, next) {
  if(req.query.nome){
    Casamento.lookUpName(req.query.nome)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
  }
  else if (req.query.ano){
    if(req.query.ano.match(/^[0-9]{4}$/)){
      Casamento.lookUpYear(req.query.ano)
        .then(dados => res.status(200).jsonp(dados))
        .catch(e => res.status(500).jsonp({error: e}))
    }
    else {
      res.status(500).jsonp({error: "Formato inválido para o ano"})
    }
  }
  else if(req.query.byAno && req.query.byAno=="true"){
    Casamento.lookUpAggregate()
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
  }
  else {
    Casamento.listFields()
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
  }
});

router.get('/casamentos/noivos', function(req, res, next) {
  Casamento.lookUpEngaged()
    .then(dados => {
      var eng = []
      dados.forEach(par => {
        var noivos = {}
        var str = par.title.split(": ")[1].split(" c.c. ")
        noivos["noivo_1"] = str[0]
        noivos["noivo_2"] = str[1]
        noivos["_id"] = par._id
        eng.push(noivos)
      })

      var sorted = eng.sort(function(a,b){
        if (a["noivo_1"] < b["noivo_1"]) {  
          return -1;  
      } else if (a["noivo_1"] > b["noivo_1"]) {  
          return 1;  
      }  
      else {
          if (a["noivo_2"] < b["noivo_2"]) {  
              return 1;  
          } else if (a["noivo_2"] > b["noivo_2"]) {  
              return -1;  
          } else {
              return 0;
          }
      } 
      })
      
      res.status(200).jsonp(sorted)
    })
    .catch(e => res.status(500).jsonp({error: e}))
});

router.get('/casamentos/:id', function(req, res, next) {
  Casamento.lookUp(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

module.exports = router;
