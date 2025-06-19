var express = require('express');
var router = express.Router();
const PDFDocument = require('pdfkit');

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
});

router.get('/reporte/:id', async (req, res) => {
  const id = req.params.id; // Obtener el ID del parámetro de la URL
  seguimientomodel
  .seguimientoId(id)
  .then((data)=>{
    // 2. Crear un nuevo documento PDF
        const doc = new PDFDocument({ margin: 50 }); // Márgenes para mejor legibilidad

        // 3. Configurar las cabeceras para la descarga del PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="reporte_seguimiento_${id}.pdf"`);

        // 4. Pipe el documento a la respuesta HTTP
        doc.pipe(res);

        // AÑADIR ESTO: Manejo de errores en el stream del documento PDF
        doc.on('error', (err) => {
            console.error('ERROR EN EL STREAM DE PDFKit:', err);
            if (!res.headersSent) {
                res.status(500).send('Error interno al generar el PDF.');
            }
            doc.end(); // Asegurarse de cerrar el documento
        });

        // 5. Añadir contenido al PDF
        doc.fontSize(22).font('Helvetica').text(`Reporte de Seguimiento #${data.id}`, { align: 'center' });
        doc.fontSize(10).font('Helvetica').text(`Fecha de Reporte: ${new Date().toLocaleDateString('es-ES')}`, { align: 'right' });
        doc.moveDown(2);

        // Información General del Seguimiento
        doc.fontSize(16).font('Helvetica').text('Detalles del Seguimiento', { underline: true });
        doc.moveDown(0.5);

        doc.fontSize(12).font('Helvetica')
            .text(`ID Seguimiento: ${data.id}`)
            .text(`Fecha Seguimiento: ${data.fecha_seguimiento ? new Date(data.fecha_seguimiento).toLocaleDateString('es-ES') : 'N/A'}`)
            .text(`Peso: ${data.peso} kg`)
            .text(`Altura: ${data.altura} cm`)
            .text(`IMC: ${data.imc_valor} (Estado: ${data.status})`)
            .text(`Condición: ${data.nombre_condicion}`)
            .text(`Comentarios: ${data.comentarios_seguimiento || 'N/A'}`); // Asumiendo que 'comentarios_seguimiento' es el campo
        doc.moveDown();

        // Sección de Resultados
        doc.fontSize(16).font('Helvetica').text('Resultados y Planificación', { underline: true });
        doc.moveDown(0.5);

        doc.fontSize(12).font('Helvetica')
            .text(`Prescripción: ${data.prescripcion || 'N/A'}`)
            .text(`Plan Nutricional: ${data.plan_nutricional || 'N/A'}`)
            .text(`Recomendaciones: ${data.recomendaciones || 'N/A'}`);
        doc.moveDown();

        // Sección de Nutrientes
        doc.fontSize(16).font('Helvetica').text('Desglose Nutricional', { underline: true });
        doc.moveDown(0.5);

        // Proteínas
        doc.fontSize(12).font('Helvetica').text('Proteínas:');
        doc.font('Helvetica')
            .text(`   - Calorías: ${data.cal_proteicas || 'N/A'} kcal`)
            .text(`   - Gramaje: ${data.gramajeProteinas || 'N/A'} g`)
            .text(`   - Ración: ${data.racionProteinas || 'N/A'}`);
        doc.moveDown(0.5);

        // Lípidos
        doc.fontSize(12).font('Helvetica').text('Lípidos:');
        doc.font('Helvetica')
            .text(`   - Calorías: ${data.cal_lipidos || 'N/A'} kcal`)
            .text(`   - Gramaje: ${data.gramajeLipidos || 'N/A'} g`)
            .text(`   - Ración: ${data.racionLipidos || 'N/A'}`);
        doc.moveDown(0.5);

        // Carbohidratos
        doc.fontSize(12).font('Helvetica').text('Carbohidratos:');
        doc.font('Helvetica')
            .text(`   - Calorías: ${data.cal_carbohidratos || 'N/A'} kcal`)
            .text(`   - Gramaje: ${data.gramajeCarbohidratos || 'N/A'} g`)
            .text(`   - Ración: ${data.racionCarbohidratos || 'N/A'}`);
        doc.moveDown();
        
        // Pie de página (opcional)
        doc.fontSize(10).font('Helvetica')
           .text('Este es un reporte generado automáticamente.', 50, doc.page.height - 50, { align: 'center', width: doc.page.width - 100 });


        // 6. Finalizar el documento
        doc.end();
        res.send('FUNCIONA');
  })
  .catch((err)=>{
      console.log('Error al generar el PDF del seguimiento:', err);
      res.status(500).send('Error al generar el PDF del seguimiento');
  })
        

});

router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
