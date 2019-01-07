
var formidable = require('formidable'); // 对表单内容接收处理
var db = require('../modal/db.js');
var md5 = require('../modal/md5.js');
var fs = require('fs');  // 文件管理
var moment = require('moment');

// 1. 注册页面
exports.showRegister = function(req, res, result){
    res.render('register');
}
// 执行注册
exports.doRegister = function(req, res, result){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        var username = fields.username;
        var password = fields.password;
        var md5Password = md5(md5(password).substr(4,7) + md5(password));
        db.insertOne('user', {
            'username': username,
            'password': md5Password
        },function(err, result){
            if(err){
                res.send('-3');
                return;
            }
            req.session.login = '1';
            res.send('1');
        })
    })
}

// 2. 登录组件
exports.showLogin = function(req, res, result){
    res.render('login');
}
// 执行登录
exports.doLogin = function(req, res, result){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        var username = fields.username;
        var password = fields.password;
        var md5Password = md5(md5(password).substr(4,7) + md5(password));
        db.find('user', {
            'username': username,
            'password': md5Password
        },function(err, result){
            if(err){
                res.send('-3'); // 服务器错误
                return;
            }
            if(result.length == 0){
                res.send('-1'); // 无该账号
                return;
            }
            var dbpassword = result[0].password;
            if(password == dbpassword){
                req.session.login = '1';
                res.send('1'); // 登录成功
                return;
            }else{
                res.send('-2'); // 密码不匹配
            }
        })
    });
    return;
}

// 3. 编写文章组件
exports.showRecording = function(req, res, next){
    if(req.session.login != '1'){
        res.send('请登录');
    }else{
        res.render('recording');
    }
}
exports.doRecording = function(req, res, next){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields){
        db.getAllCount('article', function(count){
            var allCount = count.toString();
            var date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            // 写入数据库
            db.insertOne('article', {
                'ID': parseInt(allCount)+1,
                'topic': fields.topic,
                'publisher': fields.publisher,
                'classify': fields.classify,
                'content': fields.content,
                'date': date,
                'thumbsUp': 0,
                'visitNum': 0
            }, function(err, result){
                if(err){
                    res.send('-1');
                    return;
                }
                res.send('1');
            })
        })
    })
}

// 4. 获取用户地理位置组件
exports.getAddress = function(req, res, result){
    var form = new formidable.IncomingForm();
    var ipAddress = getClientIp(req);
    form.parse(req, function(err, fields, files){
        var cxipAddress = fields.cxipAddress;
        var cxIsp = fields.cxIsp;
        var cxBrowser = fields.cxBrowser;
        var cxOS = fields.cxOS;
        var gdIsp = fields.gdIsp;
        db.getAllCount('Visitor', function(count){
            var allCount = count.toString();
            var date = moment(new Date()). formate('YYYY-MM-DD HH:mm:ss');
            // 写入数据库
            db.insertOne('Visitor', {
                'ID': parseInt(allCount)+1,
                'ipAddress': ipAddress,
                'cxipAddress': cxipAddress ? cxipAddress : '查询网无法查询',
                'cxIsp': cxIsp ? cxIsp : '查询网无法定位',
                'cxBrowser': cxBrowser ? cxBrowser : '查询网无法识别浏览器',
                'cxOS': cxOS ? cxOS : '查询网无法识别系统',
                'gdIsp': gdIsp ? gdIsp : '高德无法定位',
                'date': date
            }, function(err, result){
                if(err){
                    console.log('服务器错误'+err);
                    return;
                }
                console.log('有人访问主页');
                res.send('1');
            })
        })
    })
}

// 5.分类组件
exports.showJavascript = function(req, res, next){
    res.render('js');
}
exports.getJavascript = function(req, res, next){
    db.find('article', {
        'classify': 'javascript'
    },{
        'pageamount': 10,
        'sort': {
            'date': -1
        }
    }, function(err, result){
        if(err){
            console.log(err);
        }
        var obj = {
            'allResult': result
        };
        res.json(obj);
    })
}

// 5.获取文章
exports.getArticle = function(req, res, next){
    var page = req.query.page;
    db.find('article', {}, 
        {
            'pagemount':10, 
            'page': page, 
            'sort': 
                {'date':-1}
        }, 
        function(err, result){
            var obj = {'allResult': result};
            res.json(obj);
        }
    )
}