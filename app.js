var createError = require('http-errors');
var express = require('express');
const nunjucks = require("nunjucks")
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const flash = require('connect-flash');
require("./db")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const residentsRouter = require("./routes/residents")
const authRouter = require("./routes/auth")
const caregiverRoutes =  require("./routes/caregivers")

var app = express();

// view engine setup

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('express-session')({
  secret: '18f4e2b746ed8b07443d144ffd82aa1a05d5cddd6bdfaf81',
  resave: true,
  saveUninitialized: true,
  cookie: {
    sameSite: "lax",

  }
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());



// Passport.js configuration
require('./passport')(passport);



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/auth", authRouter)
app.use("/resident", residentsRouter)
app.use("/caregiver",caregiverRoutes)

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

app.listen()

module.exports = app;
