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

router.get('/paciente-add', function(req, res, next){
  if(req.session.auth){
    pacientesmodel
    .obtenerPatologia()
    .then((datos)=>{
      res.render('paciente-add', {datos: datos});
    })
    .catch((err)=>{
      return res.status(500).send("Error buscando las patologias");
    })
  } else{
    res.redirect('/login');
  }
});

router.post('/add-paciente', function(req, res, next){
  const {nombres, apellidos, cedula, edad, fecha_nacimiento, telefono, email, direccion, sexo, ant_familiares, alergias, ant_personales, ant_psicologicos, patologia_id} =req.body;
  nutricionistas_id = req.session.iduser;
  pacientesmodel
  .agregarPaciente(nombres, apellidos, cedula, edad, fecha_nacimiento, telefono, email, direccion, sexo, ant_familiares, alergias, ant_personales, ant_psicologicos, patologia_id, nutricionistas_id)
  .then(()=>{
    res.redirect('/users');
  })
  .catch((err)=>{
    console.log(err);
    return res.status(500).send("Error buscando agregando al paciente");
  })
});

router.get('/paciente-about/:id', function(req, res, next){
  if(req.session.auth){
  const id= req.params.id;
    pacientesmodel
    .pacienteId(id)
    .then((datos)=>{
      res.render('paciente', {datos: datos}); //No me esta renderizando la pagina y no entiendo pero si llega la funcion hasta aqui
    })
    .catch((err)=>{
      return res.status(500).send("Error buscando al paciente");
    })
  } else{
    res.redirect('/login');
  }
})

router.get('/paciente-edit/:id', function(req, res, next){
  if(req.session.auth){
  const id= req.params.id;
    pacientesmodel
    .pacienteId(id)
    .then((datos)=>{
      res.render('paciente-edit', {datos: datos});
    })
    .catch((err)=>{
      return res.status(500).send("Error buscando al paciente");
    })
  } else{
    res.redirect('/');
  }
});

router.post('/paciente-update/:id', function(req, res, next){
  const {nombres, apellidos, cedula, edad, fecha_nacimiento, telefono, email, direccion, sexo, ant_familiares, alergias, ant_personales, ant_psicologicos, patologia_id} = req.body;
  const id = req.params.id;
  pacientesmodel
  .editarPaciente(nombres, apellidos, cedula, edad, fecha_nacimiento, telefono, email, direccion, sexo, ant_familiares, alergias, ant_personales, ant_psicologicos, patologia_id, id)
  .then(()=>{
    res.redirect('/users')
  })
  .catch((err)=>{
    return res.status(500).send("Error buscando editando al paciente");
  })
});


router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
