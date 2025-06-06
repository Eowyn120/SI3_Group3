var express = require('express');
var router = express.Router();

const pacientesmodel = require('../models/pacientes');
const seguimientomodel = require('../models/seguimiento');
const imcmodel = require('../models/imc');
const condicionmodel = require('../models/condicion');
const { log } = require('debug/src/browser');

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
  req.session.idpaciente = id; 
    pacientesmodel
    .pacienteId(id)
    .then((datos)=>{
      console.log("llega aqui 2");
      
      seguimientomodel
      .obtenerSeguimiento(id)
      .then((consulta)=>{
        res.render('paciente', {datos: datos, consulta: consulta});
      })
      .catch((err)=>{
        return res.status(500).send("Error buscando los seguimientos");
      })
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
    res.redirect('/login');
  }
});

router.post('/paciente-update/:id', function(req, res, next){
  const {nombres, apellidos, cedula, edad, fecha_nacimiento, telefono, email, direccion, sexo, ant_familiares, alergias, ant_personales, ant_psicologicos} = req.body;
  const id = req.params.id;
  pacientesmodel
  .editarPaciente(nombres, apellidos, cedula, edad, fecha_nacimiento, telefono, email, direccion, sexo, ant_familiares, alergias, ant_personales, ant_psicologicos, id)
  .then(()=>{
    res.redirect('/users')
  })
  .catch((err)=>{
    return res.status(500).send("Error buscando editando al paciente");
  })
});

router.get('/seguimiento-add', function(req, res, next){
  if (req.session.auth){
      id = req.session.idpaciente;
  pacientesmodel
  .pacienteId(id)
  .then((datos)=>{
    imcmodel
    .obtenerImc()
    .then((imc)=>{
      condicionmodel
      .obtenerCondicion()
      .then((condicion)=>{
        res.render('seguimiento-add', {datos: datos, imc: imc, condicion: condicion});
      })
      .catch((err)=>{
        return res.status(500).send("Error buscando condicion");
      })
    })
    .catch((err)=>{
      return res.status(500).send("Error buscando imc");
    })
  })
  .catch((err)=>{
    return res.status(500).send("Error buscando al paciente");
  })
  } else{
    res.redirect('/login');
  }
});

router.post('/add-seguimiento', function(req, res, next){
  const {fecha, motivo, peso, talla, imc, req_calorico, imc_id, condicion_id, cal_l, gram_l, rac_l, cal_p, gram_p, rac_p, cal_ch, gram_ch, rac_ch, prescripcion, plan_nutricional, recomendaciones} = req.body;
  paciente_id = req.session.idpaciente;
  console.log(req.body);
  console.log(paciente_id);
  seguimientomodel
  .agregarSeguimiento(fecha, motivo, peso, talla, imc, req_calorico, paciente_id, imc_id, condicion_id, cal_l, gram_l, rac_l, cal_p, gram_p, rac_p, cal_ch, gram_ch, rac_ch, prescripcion, plan_nutricional, recomendaciones)
  .then(()=>{
    res.redirect('/users');
  })
  .catch((err)=>{
    console.log(err);
    return res.status(500).send("Error buscando agregando al seguimiento");
  })
})

router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
