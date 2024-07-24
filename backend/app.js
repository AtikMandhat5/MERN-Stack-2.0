var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRoutes= require('./routes/auth');

const itemsRoute = require('./routes/items');
const sitesRoute = require('./routes/sites');

const db = require('./db');
const cors = require('cors');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const SECRET_KEY = 'smartGiant'; // Replace with your own secret key

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// manage CORS middleware
app.use(cors({
  origin: '*', // Allow requests from any origin (for development purposes)
  methods: '*', //['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders:'*' //['Content-Type'], // Allow specific headers
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//dbConnection
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the MySQL database');
  }
});

app.use('/', indexRouter); //index routes
app.use('/login',authRoutes); // Use auth routes
app.use('/users', usersRouter); //users routes 
app.use('/mongo/items', itemsRoute);///mongoosh
app.use('/mongo/site', sitesRoute);//mongoDB //verified


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
