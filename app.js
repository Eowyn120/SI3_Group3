require ('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
const chartRoutes = require('./routes/charts'); // Importa las nuevas rutas

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Después de 'const path = require('path');'
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/api', chartRoutes); // Prefijo '/api' para tus rutas de datos

// --- ¡ESTA ES LA RUTA QUE NECESITAS REVISAR/AÑADIR! ---
// Ruta para renderizar la página dashboard_pacientes
app.get('/dashboard_pacientes', (req, res) => {
    if (req.session.auth){
    res.render('dashboard_pacientes'); // Renderiza tu archivo EJS
    }else{
      res.redirect('/login');
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
