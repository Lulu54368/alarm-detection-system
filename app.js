var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var deviceRouter = require('./routes/device')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/device', deviceRouter);
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
require("dotenv").config();
const session = require("express-session");
app.use(
    session({
      // The secret used to sign session cookies (ADD ENV VAR)
      secret: process.env.SESSION_SECRET,
      name: "alarm_detection", // The cookie name (CHANGE THIS)
      saveUninitialized: false,
      resave: false,
      proxy: process.env.NODE_ENV == "production",
      cookie: {
        sameSite: "strict",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge:  3000000,
      },
    })
  );

module.exports = app;
