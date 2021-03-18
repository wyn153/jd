var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const multer = require("multer");
const upload = multer({ dest: './public/uploads' });

var indexRouter = require('./routes/index');
var proRouter = require('./routes/pro');
var bannerRouter = require('./routes/banner');
var loginRouter = require('./routes/login');
var userRouter = require('./routes/user');
var orderRouter = require('./routes/order');
var cartRouter = require('./routes/cart');

var proApi = require("./api/pro");
var bannerApi = require("./api/banner");
var userApi = require("./api/user");
var cartApi = require("./api/cart");
var orderApi = require("./api/order");
var searchApi = require("./api/search");

var app = express();

app.all("*",(req,res,next)=>{
  // cors配置
  // 允许所有来源
  res.header("Access-Control-Allow-Origin","*");
  // 允许的请求方式
  res.header("Access-Control-Allow-Methods","get,post");

  res.header("Access-Control-Allow-Headers",'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, token');
  next();
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 注册session模块，配置session信息
app.use(session({
  secret: '千锋H5，前端界的扛把子！！！',   // 加密因子
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 30}    // 过期时间
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "1000kb"}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(upload.any());

app.use('/api/pro', proApi);
app.use('/api/banner', bannerApi);
app.use('/api/user', userApi);
app.use('/api/cart', cartApi);
app.use('/api/order', orderApi);
app.use('/api/search', searchApi);

// 所有的路由注册之前，使用all方法拦截所有路由
app.all("*", (req, res, next)=>{
  // 进行状态的读取，验证
  // console.log(req.cookies.isLogin);
  // console.log(req.session.isLogin);
  // 注意，通过登录页面和登录验证 自身的路由
  if(req.session.isLogin === "ok" || req.url === "/login" || req.url === "/login/check"){
    next();
  }else{
    res.redirect("/login");
  }
})

app.use('/', indexRouter);
app.use('/pro', proRouter);
app.use('/banner', bannerRouter);
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/order', orderRouter);
app.use('/cart', cartRouter);

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
