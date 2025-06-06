require ('dotenv').config();
var express = require('express');
var router = express.Router();

const nutricionistasModel = require("../models/nutricionista");


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
  const {nombre, apellido, email, password, preg, resp} = req.body;
  nutricionistasModel
  .registrar(nombre, apellido, email, password, preg, resp)
  .then((idNutricionistaRegistrado)=>{
    res.redirect('/login');
  })
  .catch((err)=>{
      console.error(err.message);
      return res.status(500).send('Error en el registro')
  })
});

router.post('/login', function(req, res, next){
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(500).send("No hay nombre o precio");
  }
  let concat, concat2;
  nutricionistasModel
    .login(email)
    .then((resultados) => {
      concat = resultados[0].password;
      concat2 = resultados[0].id;
      console.log(concat);
      console.log(concat2);
      if (password == concat){
        req.session.auth = true;
        req.session.iduser= concat2;
        res.redirect('/users');
      }else{
        res.send('CREDENCIALES INCORRECTAS')
      }
    })
    .catch((err) => {
      console.error(err.message);
      return res.status(500).send('Error en el inicio de sesion')
    });
});

module.exports = router;
