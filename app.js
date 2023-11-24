const createError = require('http-errors');
const express = require('express');
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');

const morgan = require('morgan');
const winston = require('winston')

const { getMoment } = require('./config/utils');

const moment = getMoment()

const HomeController = require('./controllers/HomeController');
const AdminController = require('./controllers/AdminController');
const OperatorController = require('./controllers/OperatorController');
const ClientController = require('./controllers/ClientController');
const SecurityController = require('./controllers/SecurityController');

const app = express();
app.use(cors())


const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  format: combine(
    label({ label: "HMS" }),
    timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.File({
      filename: `logs/error-${new Date().toISOString().substring(0, 10)}.log`,
      level: "error"
    }),
    new winston.transports.File({
      filename: `logs/combined-${new Date().toISOString().substring(0, 10)}.log`
    })
  ]
});

app.use(morgan("combined", {
  stream: {
    write: message => logger.info(message)
  }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  '/',
  (req, res, next) => {
    console.log("__HomeController________________________________")
    next()
  }, HomeController
)

app.use(
  '/admin',
  (req, res, next) => {
    console.log("__AdminController________________________________")
    next()
  }, AdminController
)

app.use(
  '/operator',
  (req, res, next) => {
    console.log("__OperatorController________________________________")
    next()
  }, OperatorController
)

app.use(
  '/client',
  (req, res, next) => {
    console.log("__ClientController________________________________")
    next()
  }, ClientController
)

app.use(
  '/security',
  (req, res, next) => {
    console.log("__SecurityController___________________________")
    next()
  }, SecurityController
)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;