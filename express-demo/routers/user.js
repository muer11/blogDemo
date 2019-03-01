/**是否成功*/
//  boolean success; 
/**返回码*/
//  String code; 000:查询成功 001:查询成功无记录 100:查询失败（接口异常） 101:接口不存在
/**返回信息*/
// String msg;
/**返回数据*/
// Object data;
// {
//     success:
//     code: 
//     msg:
//     data:
// }
// SUCCESS("0000", "查询成功"),
// NODATA("0001", "查询成功无记录"),
// FEAILED("0002", "查询失败"),
// ACCOUNT_ERROR("1000", "账户不存在或被禁用"),
// API_NOT_EXISTS("1001", "请求的接口不存在"),
// API_NOT_PER("1002", "没有该接口的访问权限"),
// PARAMS_ERROR("1004", "参数为空或格式错误"),
// SIGN_ERROR("1005", "数据签名错误"),
// AMOUNT_NOT_QUERY("1010", "余额不够，无法进行查询"),
// API_DISABLE("1011", "查询权限已被限制"),
// UNKNOWN_IP("1099", "非法IP请求"),
// SYSTEM_ERROR("9999", "系统异常");

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

//登录状态
router.get("/isLogin", function (req, res) {
    if (typeof req.session.username == "undefined") {
        res.json({
            success: true,
            code: 001,
            msg: "此账号未登录",
            data: null
        });
        return false;
    }else{
        res.json({
            success: true,
            code: 000,
            msg: "此账号已登录",
            data: {
                name: req.session.username,
                role: req.session.role
            }
        });
    }
});

//注册
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
        var role = 0;
        User.create({
            "username" : username,
            "password": password,
            "email": email,
            "phone": phone,
            "residence": residence,
            "createAt": new Date(),
        },function(err,result){
            if(err){
                //服务器错误
                res.json({
                    success: false,
                    code: 100,
                    msg: "服务器异常",
                    data: null
                }); 
                return;
            }
            res.json({
                success: true,
                code: 000,
                msg: "注册成功",
                data: {
                    name: username,
                    role: role
                }
            });
        });
    });
})

//登陆
router.post("/doLogin", function (req, res, result) {
    
    //得到用户填写的东西
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var username = fields.username;
        var password = fields.password;
        // password = md5(md5(password).substr(4,7) + md5(password));
        //检索数据库，按登录名检索数据库，查看密码是否匹配
        User.find({
            "username": username
        }, function (err, result) {
            // 登录判断时返回的信息不需详细，否则容易造成风险
            if(err){
                //服务器错误
                res.json({
                    success: false,
                    code: 100,
                    msg: "服务器异常",
                    data: null
                });
                return
            }
            if(result.length == 0){
                //查无此人
                res.json({
                    success: true,
                    code: 001,
                    msg: "用户名或密码错误",
                    data: null
                });
                return;
            }
            var dbpassword = result[0].password;
            var userid = result[0]._id.toString();
            var role = result[0].role;
            //要对用户这次输入的密码，进行相同的加密操作。然后与
            //数据库中的密码进行比对
            if(password == dbpassword){
                //登陆成功
                req.session.username = username;
                req.session.role = role;
                req.session.userid = userid;
                res.json({
                    success: true,
                    code: 000,
                    msg: "登陆成功",
                    data: {
                        name: username,
                        role: role
                    }
                });
                return;
            }else{
                //密码不匹配
                res.json({
                    success: true,
                    code: 001,
                    msg: "用户名或密码错误",
                    data: null
                });
            }
        });
    });
    return;
});

//退出登录
router.get("/logout", function(req, res){
    req.session.destroy(function(err){
        if(err){
            res.json({
                success: false,
                code: 100,
                msg: "服务器异常",
                data: null
            });
            return;
        }
        res.clearCookie("blogSession");
        res.json({
            success: true,
            code: 000,
            msg: "退出成功",
            data: null
        });
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