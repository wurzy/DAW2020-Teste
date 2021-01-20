var express = require('express');
var router = express.Router();

var axios = require('axios');

function verifyToken(req){
  var token = null

  if(req.cookies.token){
    token = req.cookies.token
  }
  if (req.query.token){
    token = req.query.token
  }
  return token
}

router.get('/', function(req, res, next) {
  var token = verifyToken(req)
  if(token){
    axios.get("http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=" + token)
      .then(dados => {
        res.render("index", {dados: dados.data})
      })
      .catch(e => res.render('error', {error: e}))
  }
  else {
    res.render('error', {error: "Não tem acesso à página, realize o login primeiro."})
  }
});

router.get('/login', function(req, res, next) {
  res.render("login-form")
});

router.get('/termos',function(req, res, next) {
  var token = verifyToken(req)
  if(token){
    axios.get("http://clav-api.di.uminho.pt/v2/termosIndice?token=" + token)
      .then(dados => {
        res.render("index-termos", {dados: dados.data})
      })
      .catch(e => res.render('error', {error: e}))
  }
  else {
    res.render('error', {error: "Não tem acesso à página, realize o login primeiro."})
  }
})

router.post('/login', function(req, res) {
  axios.post('http://clav-api.di.uminho.pt/v2/users/login', req.body)
    .then(dados => {
      if(dados.data.token){
        res.cookie('token', dados.data.token, {
          expires: new Date(Date.now() + '1d'),
          secure: false, // set to true if your using https
          httpOnly: true
        });
        res.redirect("/")
      }
    })
    .catch(e => res.render('error', {error: e}))
});

router.get('/codigo/:id', function(req,res,next) {
  var token = verifyToken(req)
  axios.get("http://clav-api.di.uminho.pt/v2/classes/c" + req.params.id + "?token=" + token)
    .then(dados => {
      res.render("classe", {dados: dados.data})
    })
    .catch(e => res.render('error', {error: e}))
})

module.exports = router;
