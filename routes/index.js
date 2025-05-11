var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Nutricode' });
});

router.get('/nosotros', function(req, res, next){
  res.render('about', { title: 'Nosotros'});
});

router.get('/clientes', function(req, res, next){
  res.render('clients', {title: 'Clientes'});
});

router.get('/mision', function(req, res, next){
  res.render('ourwork', {title: 'Mision'});
});

router.get('/register', function(req, res, next){
  res.render('register', {title: 'Registro'});
});

router.get('/login', function(req, res, next){
  res.render('login', {title: 'Inicio de Sesión'});
});

router.post('/register', function(req, res, next){
  const {nombre, apellido, email, password, preg, seg} = req.body;
  console.log(req.body);
  res.redirect('/login');
  console.log('Registro funciona');
  
})

module.exports = router;
