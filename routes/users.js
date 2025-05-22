var express = require('express');
var router = express.Router();

const pacientesmodel = require('../models/pacientes');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.session.auth) {
    idNutricionista = req.session.iduser;
    pacientesmodel
    .pacientes(idNutricionista)
    .then((datos) => {
      res.render('users', {datos: datos});
    }).catch((err) => {
      return res.status(500).send("Error buscando pacientes");
    });
  }
  else{ 
    res.redirect('/login');
  }
});

router.get('/paciente/:id', function(req, res, next){
  if(req.session.auth){
  const id= req.params.id;
    pacientesmodel
    .pacienteId(id)
    .then((datos)=>{
      res.render('paciente', {datos: datos});
    })
    .catch((err)=>{
      return res.status(500).send("Error buscando al paciente");
    })
  } else{
    res.redirect('/');
  }
})




router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
