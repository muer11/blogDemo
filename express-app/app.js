var createError = require('http-errors');
var express = require('express');
var app = express();
var router = require('./routes/router.js');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ueditor = require('ueditor');
var session = require('express-session');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// 1. 使用session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUnitialized: true
}));
app.use(bodyParser.json());
app.use(express.static('./public'));

// 2. Ueditor
app.use('/libs/ueditor/ue', ueditor(path.join(__dirname, 'public'), function(req, res, next){
  // ueditor客户发起上传图片请求
  if(req.query.action === 'uploadimage'){
    var foo = req.ueditor;
    var imgname = req.ueditor.filename;
    var img_url = '/upload';
    res.ue_up(img_url);
  }
  // 客户端发起图片列表请求
  else if(req.query.action === 'listimage'){
    var dir_url = '/upload';
    res.ue_list(dir_url);
  }
  // 客户端发起其它请求
  else{
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/libs/ueditor/nodejs/config.json');
  }
}));

// 3. 请求设置
app.get('/', router.showIndex);
app.get('/recording', router.showRecording);
app.get('/doRecording', router.doRecording);
app.get('/getArticle', router.getArticle);
app.get('/getAllAmount', router.getAllAmount);
app.get('/article', router.showArticle);
app.get('/delArticle', router.delArticle);
app.get('/register', router.showRegister);
app.post('/doRegister', router.doRegister);

console.log('server running');
app.listen(3000);
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.post('/getArticle', router.getArticle); // 获取文章
// app.get('/', function(req, res){
//   console.log(1111);
//   res.send('GET request to the homepage');
// });

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
