var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session')

let usersRouter = require('./routes/users');
let useritemRouter = require('./routes/useritem')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require('./db/redis')  //引用redis客户端连接
const RedisStore = require('connect-redis')(session)   
const sessionStore = new RedisStore({
  client: redisClient
})


app.use(session({
  secret: 'WJiol$_123115',
  cookie:{
    path:'/',  //默认
    httpOnly:true,   // 默认
    maxAge:24 * 60 * 60 * 1000,
  },
  store: sessionStore  //将session直接放进redis
}))



app.use('/api/users', usersRouter);
app.use('/api/useritem',useritemRouter);

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
