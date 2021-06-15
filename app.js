var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var loginRouter = require('./routes/login');
var menueRouter = require('./routes/menu');
var createmovieRouter = require('./routes/CreateNewMovie');
var editUsersRouter = require('./routes/editUsers');
var SerchMovieRouter = require('./routes/SerchMoviePage');
var movieDataRouter = require('./routes/movieData');


var app = express();

app.use(session({ secret: 'My Secret' }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/menu', menueRouter);
app.use('/createmovie', createmovieRouter);
app.use('/editUsers', editUsersRouter);
app.use('/searchmovie', SerchMovieRouter);
app.use('/movieData', movieDataRouter);

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
