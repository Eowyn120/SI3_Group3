var express = require('express');
var router = express.Router();

const adminModels = require ('../models/admin');
const admin = require('../models/admin');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (!req.session.admin) res.render('login-admin');
  else res.redirect('/admin/inicio');
});

router.post('/login-admin', function(req, res, next){
  const {user, password} = req.body;
  adminModels
  .login(user)
  .then((resultados)=>{
    concat = resultados[0].password;
    concat2 = resultados[0].id;
    console.log(concat);
    console.log(concat2);
    if (password == concat){
      req.session.admin = true;
      req.session.iduser= concat2;
      res.redirect('/admin/inicio');
    }else{
      res.send('esto no funciona')
    }
    })
  .catch((err) => {
    console.error(err.message);
    return res.status(500).send('Error en el inicio de sesion')
  });
})

router.get('/inicio', function(req, res, next){
  if(req.session.admin){
    adminModels
    .obtenerNutricionista()
    .then((datos)=>{
      res.render('admin', {datos: datos});
    })
    .catch((err)=>{
      console.error(err.message);
      return res.status(500).send('Error a mostrar nutricionistas')
    })
  }else{
    res.redirect('/admin');
  }
});

router.get('/patologia', function(req, res, next){
  if (req.session.admin){
    adminModels
    .obtenerPatologia()
    .then((datos)=>{
      res.render('patologia', {datos: datos});
    })
    .catch((err)=>{
      console.error(err.message);
      return res.status(500).send('Error a mostrar las patologias');
    })
  }else{
    res.redirect('/admin')
  }
});

router.get('/patologia-add', function(req, res, next){
  if (req.session.admin){
    res.render('patologia-add');
  } else{
    res.redirect('/admin');
  }
});

router.post('/add-patologia', function(req, res, next){
  const {nombre} = req.body;
  adminModels
  .insertarPatologia(nombre)
  .then(()=>{
    res.redirect('/admin/patologia');
  })
  .catch((err)=>{
    console.error(err.message);
    return res.status(500).send('Error en el inicio de sesion')
  })
});

router.get('/patologia-edit/:id', function(req, res, next){
  if(req.session.admin){
    const id = req.params.id;
    adminModels
    .obtenerPatologiaId(id)
    .then((datos)=>{
      res.render('patologia-edit', {datos: datos});
    })
    .catch((err)=>{
      console.error(err.message);
      return res.status(500).send('Error buscando la patologia')
    })
  }else{
    res.redirect('/admin');
  }
});

router.post('/patologia-update/:id', function(req, res, next){
  const id = req.params.id;
  const {nombre}= req.body;
  adminModels
  .editarPatologia(id, nombre)
  .then(()=>{
    res.redirect('/admin/patologia');
  })
  .catch((err)=>{
    console.error(err.message);
    return res.status(500).send('Error editando el producto');
  })
});

router.get('/patologia-delete/:id', function(req, res, next){
  if(req.session.admin){
    const id = req.params.id;
    adminModels
    .obtenerPatologiaId(id)
    .then((datos)=>{
      res.render('patologia-delete', {datos: datos});
    })
    .catch((err)=>{
      console.error(err.message);
      return res.status(500).send('Error en el inicio de sesion')
    })
  }
});

router.get('/delete-patologia/:id', function(req, res, next){
  if(req.session.admin){
    const id = req.params.id;
    adminModels
    .eliminarPatologia(id)
    .then(()=>{
      res.redirect('/admin/patologia')
    })
    .catch(()=>{
      console.error(err.message);
      return res.status(500).send('Error en el inicio de sesion')
    })
  }
});

router.get('/imc', function(req, res, next){
  if (req.session.admin){
    adminModels
    .obtenerImc()
    .then((datos)=>{
      res.render('imc', {datos: datos});
    })
    .catch((err)=>{
      console.error(err.message);
      return res.status(500).send('Error los estados de imc')
    })
  }else{
    res.redirect('/admin');
  }
});

router.get('/imc-add', function(req, res, next){
  if (req.session.admin){
    res.render('imc-add');
  } else{
    res.redirect('/admin');
  }
});

router.post('/add-imc', function(req, res, next){
  const {status} = req.body;
  adminModels
  .insertarImc(status)
  .then(()=>{
    res.redirect('/admin/imc');
  })
  .catch((err)=>{
    console.error(err.message);
    return res.status(500).send('Error en el inicio de sesion')
  })
});

router.get('/imc-edit/:id', function(req, res, next){
  if (req.session.admin){
    const id = req.params.id;
    adminModels
    .obtenerImcId(id)
    .then((datos)=>{
      res.render('imc-edit', {datos: datos});
    })
    .catch((err)=>{
      console.error(err.message);
      return res.status(500).send('Error en buscar el imc');
    })
  } else{
    res.redirect('/admin');
  }
});

router.post('/imc-update/:id', function(req, res, next){
  const id = req.params.id;
  const {status} = req.body;
  adminModels
  .editarImc(id, status)
  .then(()=>{
    res.redirect('/admin/imc')
  })
  .catch((err)=>{
    console.error(err.message);
    return res.status(500).send('Error editando imc');
  })
});

router.get('/imc-delete/:id', function(req, res, next){
  if(req.session.admin){
    const id = req.params.id;
    adminModels
    .obtenerImcId(id)
    .then((datos)=>{
      res.render('imc-delete', {datos: datos});
    })
    .catch((err)=>{
      console.error(err.message);
      return res.status(500).send('Error buscando imc')
    })
  }else{
    res.redirect('/admin');
  }
});

router.get('/delete-imc/:id', function(req, res, next){
  if(req.session.admin){
    const id = req.params.id;
    adminModels
    .eliminarImc(id)
    .then(()=>{
      res.redirect('/admin/imc');
    })
  } else{
    res.redirect('/admin');
  }
});

router.get('/condicion', function(req, res, next){
  if (req.session.admin){
    adminModels
    .obtenerCondicion()
    .then((datos)=>{
      res.render('condicion', {datos: datos});
    })
    .catch((err)=>{
      console.error(err.message);
      return res.status(500).send('Error mostrando las condiciones');
    })
  } else {
    res.redirect('/admin');
  }
});

router.get('/condicion-add', function(req, res, next){
  if (req.session.admin){
    res.render('condicion-add');
  } else{
    res.redirect('/admin');
  }
});

router.post('/add-condicion', function(req, res, next){
  const {nombre} = req.body;
  adminModels
  .insertarCondicion(nombre)
  .then(()=>{
    res.redirect('/admin/condicion');
  })
  .catch((err)=>{
    console.error(err.message);
    return res.status(500).send('Error ingresando condicion');
  })
});

router.get('/condicion-edit/:id', function(req, res, next){
  if(req.session.admin){
    const id = req.params.id;
    adminModels
    .obtenerCondicionId(id)
    .then((datos)=>{
      res.render('condicion-edit', {datos: datos});
    })
    .catch((err)=>{
      console.error(err.message);
      return res.status(500).send('Error buscando la condicion');
    })
  } else{
    res.redirect('/admin');
  }
});

router.post('/condicion-update/:id', function(req, res, next){
  const id = req.params.id;
  const {nombre} = req.body;
  adminModels
  .editarCondicion(id, nombre)
  .then(()=>{
    res.redirect('/admin/condicion');
  })
  .catch((err)=>{
    console.error(err.message);
    return res.status(500).send('Error editando condicion');
  })
});

router.get('/condicion-delete/:id', function(req, res, next){
  if(req.session.admin){
    const id= req.params.id;
    adminModels
    .obtenerCondicionId(id)
    .then((datos)=>{
      res.render('condicion-delete', {datos: datos});
    })
  } else{
    res.redirect('/admin');
  }
});

router.get('/delete-condicion/:id', function(req, res, next){
  if(req.session.admin){
    const id = req.params.id;
    adminModels
    .eliminarCondicion(id)
    .then(()=>{
      res.redirect('/admin/condicion');
    })
    .catch((err)=>{
    console.error(err.message);
    return res.status(500).send('Error eliminando condicion');
    })
  }
});

router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;