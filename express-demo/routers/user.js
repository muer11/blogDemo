const formidable = require('formidable');
const express = require("express");
const router = express.Router();
const User = require("../model/user");

//所有用户信息
// router.get("/", function (req, res) {
//     console.log("-----------test---------------");
//     console.log(req.session);
//     User.find({}, (err, result) => {
//         console.log("result.............")
//         if (err) {
//             res.send("server or db error");
//         }
//         console.log(result);
//         res.send(result);
//     });
//     // res.send("-----------test---------------");
// });

//登录状态 -1未登录 0登录
router.get("/isLogin", function (req, res) {
    if (typeof req.session.username == "undefined") {
        res.json({
            ret_code: -1,
            ret_msg: "账号未登录"
        })
        return false;
    }else{
        res.json({
            ret_code: 0,
            ret_msg: {
                name: req.session.username,
                role: req.session.role
            }
        })
    }
});

//执行注册 -1未注册 0注册
router.post('/doRegister', function (req, res) {
    //得到用户填写的东西
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        //得到表单之后做的事情
        var username = fields.username;
        var password = fields.password;
        var email = fields.email;
        var phone = fields.phone;
        var residence = fields.residence;
        // var date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        // var md5PassWord = md5(md5(password).substr(4,7) + md5(password));
        // db.updateOne("counters", {"_id":"userId"}, function (result) {
            // if (result !== "success") return;
            // db.find("counters", {"_id":"userId"}, function (err, result){
            //     var id = result[0].sequence_value;
            User.create({
                    // "id": id,
                    "username" : username,
                    "password": password,
                    "email": email,
                    "phone": phone,
                    "residence": residence,
                    // "date": date
                },function(err,result){
                    if(err){
                        res.send("-3");//服务器错误
                        return;
                    }
                    // req.session.login = "1";
                    // res.send("1");//注册成功，写入SESSION
                    res.json({
                        ret_code: 0,
                        ret_msg: {
                            name: req.session.username
                        }
                    })
                });
        //     });
        // });
    });
})

//执行登陆 0登录成功 -1未登录
router.post("/doLogin", function (req, res, result) {
    
    //得到用户填写的东西
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        var username = fields.username;
        var password = fields.password;
        // password = md5(md5(password).substr(4,7) + md5(password));

        // console.log(fields);
        //检索数据库，按登录名检索数据库，查看密码是否匹配
        User.find({
            "username": username
        }, function (err, result) {
            // 登录判断时返回的信息不需详细，否则容易造成风险
            if(err){
                // res.send("-3");//服务器错误
                res.json({
                    ret_code: -1,
                    ret_msg: "服务器错误"
                })
                return
            }
            // console.log("------result-------");
            // console.log(result);
            // console.log(username);
            // console.log(password);
            if(result.length == 0){
                // res.send("-1");  //-1没有这个人
                res.json({
                    ret_code: -1,
                    ret_msg: "用户名或密码错误"
                })
                return;
            }
            var dbpassword = result[0].password;
            var userid = result[0]._id.toString();
            var role = result[0].role;
            //要对用户这次输入的密码，进行相同的加密操作。然后与
            //数据库中的密码进行比对
            if(password == dbpassword){
                // req.session.login = "1";
                req.session.username = username;
                req.session.role = role;
                req.session.userid = userid;
                // res.send("1");  //登陆成功
                res.json({
                    ret_code: 0,
                    ret_msg: {
                        name: req.session.username,
                        role: role
                    }
                })
                console.log("-----------doLogin---------------")
                console.log(req.session);
                return;
            }else{
                // res.send("-2"); //密码不匹配
                res.json({
                    ret_code: -1,
                    ret_msg: "用户名或密码错误"
                })
            }
        });
    });
    return;
});

//退出登录
router.get("/logout", function(req, res){
    req.session.destroy(function(err){
        if(err){
            res.json({ret_code:-1, ret_msg: "退出登录失败"});
            return;
        }
        res.clearCookie("blogSession");
        res.json({ret_code: 0, ret_msg: "退出登录成功"});
    })
})

module.exports = router;

// //注册页面
// exports.showRegister = function (req, res ,result) {
//     res.render("register");
// };
// //执行注册
// exports.doRegister = function (req, res, result) {
//     //得到用户填写的东西
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//         //得到表单之后做的事情
//         var username = fields.username;
//         var password = fields.password;
//         var email = fields.email;
//         var phone = fields.phone;
//         var residence = fields.residence;
//         var date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
//         // var md5PassWord = md5(md5(password).substr(4,7) + md5(password));
//         db.updateOne("counters", {"_id":"userId"}, function (result) {
//             if (result !== "success") return;
//             db.find("counters", {"_id":"userId"}, function (err, result){
//                 var id = result[0].sequence_value;
//                 db.insertOne("user",{
//                     "id": id,
//                     "username" : username,
//                     "password": password,
//                     "email": email,
//                     "phone": phone,
//                     "residence": residence,
//                     "date": date
//                 },function(err,result){
//                     if(err){
//                         res.send("-3");//服务器错误
//                         return;
//                     }
//                     req.session.login = "1";
//                     res.send("1");//注册成功，写入SESSION
//                 });
//             });
//         });
//     });
// };

// //登陆页面
// exports.showLogin = function (req, res ,result) {
//     res.render("login");
// };

// //执行登陆
// exports.doLogin = function (req, res, result) {
//     //得到用户填写的东西
//     var form = new formidable.IncomingForm();

//     form.parse(req, function(err, fields, files) {
//         var username = fields.username;
//         var password = fields.password;
//         // password = md5(md5(password).substr(4,7) + md5(password));

//         console.log(fields);
//         //检索数据库，按登录名检索数据库，查看密码是否匹配
//         db.find("user",{"username":username},function(err,result){
//             if(err){
//                 res.send("-3");//服务器错误
//                 return
//             }
//             if(result.length == 0){
//                 res.send("-1");  //-1没有这个人
//                 return;
//             }
//             var dbpassword = result[0].password;
//             //要对用户这次输入的密码，进行相同的加密操作。然后与
//             //数据库中的密码进行比对
//             if(password == dbpassword){
//                 req.session.login = "1";
//                 res.send("1");  //登陆成功
//                 return;
//             }else{
//                 res.send("-2"); //密码不匹配
//             }
//         });
//     });

//     return;
// };