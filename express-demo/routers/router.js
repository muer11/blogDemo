var express = require("express");
var router = express.Router();
var User = require("../model/user");

// var db = require("../model/db.js");
// var formidable = require('formidable');
// var md5 = require("../config/md5");
// var fs = require("fs");
// var moment = require('moment');
// var MongoClient = require('mongodb').MongoClient, test = require('assert');

exports.testSchemas = function (req, res, next) {
    console.log("schemas.........");
    User.findOne({
        username: "muer111"
    }, (err, result)=>{
        console.log("router.............")
        if(err){res.send("server or db error");}
        console.log(result);
        res.send(result);
    });
} 

// //首页
// exports.showIndex = function (req,res,next) {
//     res.render("index");
// };
// //编写页面
// exports.showRecording = function (req, res, next) {
//     if(req.session.login != "1"){
//         res.send("请登陆！");
//     }else {
//         res.render("recording");
//     }
// };

// // 发表文章（新建）
// exports.doRecording = function (req, res, next) {
//     // console.log(req);
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields) {
//         console.log(fields);
//         // res.send("发表成功");
//         // db.getAllCount("article", function (count) {
//         //     var allCount = count.toString();
//         db.updateOne("counters", {"_id":"articleId"}, function (result) {
//             if (result !== "success") return;
//             db.find("counters", {"_id":"articleId"}, function (err, result){
//                 var id = result[0].sequence_value;
//                 var date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
//                 //写入数据库
//                 db.insertOne("article", {
//                     "id": id,
//                     "userId": fields.userId,
//                     "tagId": fields.tagId, // 文章分类
//                     "title": fields.title, // 文章标题
//                     "content" : fields.content, // 文章正文
//                     "date" : date,
//                     "isPublished": fields.isPublished, // 已发布或草稿箱
//                     "visitNum" : 0, //浏览数
//                     "likeNum" : 0 //点赞数
//                 },function (err, result) {
//                     if(err){
//                         res.send("-1");
//                         return;
//                     }
//                     res.send("1");
//                 });
//             });
//         });
//     });
// };
// // 编辑文章
// exports.editRecording = function (req, res, next) {
//     // console.log(req);
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields) {
//         console.log(fields);
//         //更新数据库
//         var date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
//         db.updateMany("article", {
//             "id": parseInt(fields.articleId),
//         },{$set:{
//             "tagId": fields.tagId, // 文章分类
//             "title": fields.title, // 文章标题
//             "content": fields.content, // 文章正文
//             "isPublished": fields.isPublished, // 已发布或草稿箱
//             "updateDate": date,
//             // "visitNum": 0, //浏览数
//             // "likeNum": 0 //点赞数
//         }}, function (err, result) {
//             if (err) {
//                 res.send("-1");
//                 return;
//             }
//             res.send("1");
//         }); 
//     });
// };
// //取得文章
// exports.getArticle = function (req, res, next) {
//     var info = req.query;
//     var userId = info.userId;
//     var tagId = ((info.tagId && info.tagId !== "all") ? info.tagId : {
//         $ne: null
//     });
//     var isPublished = info.isPublished;
//     var page = info.page;
//     var sortQuery = {};
//     switch (info.sort) {
//         case "visitNum":
//             sortQuery = {
//                 "visitNum": -1
//             }
//             break;
//         case "likeNum":
//             sortQuery = {
//                 "likeNum": -1
//             }
//             break;
//         default:
//             sortQuery = {
//                 "date": -1
//             }
//         break;
//     }
//     db.find("article", { 
//         "userId": userId,
//         "tagId": tagId,
//         "isPublished": isPublished,
//     }, {
//         "pageamount": 10,
//         "page": page,
//         "sort": sortQuery,
//     }, function (err, result) {
//         var obj = {
//             "allResult": result
//         };
//         // console.log(result);
//         res.json(obj);
//     });
// };
// //取得文章-前台
// exports.getTagArticle = function (req, res, next) {
//     var info = req.query;
//     var tagId = ((info.tagId && info.tagId !== "all") ? info.tagId : {
//         $ne: null
//     });
//     var isPublished = info.isPublished;
//     var page = info.page ? info.page : 0;
//     var sortQuery = {};
//     switch (info.sort) {
//         case "visitNum":
//             sortQuery = {
//                 "visitNum": -1
//             }
//             break;
//         case "likeNum":
//             sortQuery = {
//                 "likeNum": -1
//             }
//             break;
//         default:
//             sortQuery = {
//                 "date": -1
//             }
//             break;
//     }
//     db.find("article", {
//         "tagId": tagId,
//         "isPublished": isPublished,
//     }, {
//         "pageamount": 10,
//         "page": page,
//         "sort": sortQuery,
//     }, function (err, result) {
//         var obj = {
//             "allResult": result
//         };
//         res.json(obj);
//     });
// };
// //取得单篇文章
// exports.findOneArticle = function (req, res, next) {
//     if (req.query.articleId == undefined) {
//         res.send("你想干嘛？");
//         return;
//     }
//     var articleId = parseInt(req.query.articleId);
//     db.find("article", {
//         "id": articleId
//     }, function (err, result) {
//         if (err) {
//             console.log(err);
//         }
//         var obj = {
//             "allResult": result
//         };
//         console.log(result);
//         res.json(obj);
//     });
// };


// //取得总页数
// exports.getAllAmount = function (req, res, next) {
//     db.getAllCount("article", function (count) {
//         res.send(count.toString());
//     });
// };

// //文章页面
// exports.showArticle = function (req, res, next) {
//     if(req.query.articleId == undefined){
//         res.send("你想干嘛？");
//         return;
//     }
//     var aId = parseInt(req.query.ID);
//     db.find("article",{"ID":aId},function (err,result) {
//         if(err){
//             console.log(err);
//         }
//         res.render("article",{
//             "allResult" : result[0]
//         });
//     });
// };

// //删除文章
// exports.delArticle =function (req, res, result) {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//         var articleId = parseInt(fields.articleId);
//         db.deleteMany("article",{"id":articleId},function (err,results) {
//             if(err){
//                 console.log("删除文章错误:"+err);
//                 return
//             }
//             res.send("1");
//         });
//     });
// };

// //点赞文章
// exports.pointArticle = function(req, res, next){
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//         var articleId = fields.articleId;
//         db.updateMany("article",{
//             "id": parseInt(articleId),
//         }, {
//             $inc: {"likeNum":1}
//         }, function(err, result){
//             if(err){
//                 console.log("文章点赞错误" + err);
//                 return;
//             }
//             res.send("1");
//         })
//     })
// }

// // 显示标签-前台
// exports.showTagsFore = function (req, res, next) {
    
//     db.find("tag", {
//         // "userId": parseInt(userId),
//     }, {
//         "pageamount": 200,
//         "page": 0,
//         "sort": {
//             "id": 1
//         }
//     }, function (err, result) {
//         if (err) {
//             console.log("查找标签错误：" + err);
//             return;
//         }
//         var allTags = {
//             "allTags": result
//         };
//         res.json(allTags);
//     });
// }
// // 显示标签-后台
// exports.showTags = function (req, res, next) {
//     var userId = req.query.userId;
//     console.log(userId);
//     db.find("tag", {
//         "userId": parseInt(userId),
//     }, {
//         "pageamount": 200,
//         "page": 0,
//         "sort": {
//             "id": 1
//         }
//     }, function (err, result) {
//         if (err) {
//             console.log("查找标签错误：" + err);
//             return;
//         }
//         var allTags = {
//             "allTags": result
//         };
//         res.json(allTags);
//     });
// }

// // 添加标签
// exports.addTag = function(req, res, next){
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields) {
//         var date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
//         // mongodb非关系型数据库，counters中记录了每张表的id
//         db.updateOne("counters", {"_id":"tagId"}, function (result) {
//             if (result !== "success") return;
//             db.find("counters", {"_id":"tagId"}, function (err, result){
//                 var id = result[0].sequence_value;
//                 db.insertOne("tag", {
//                     "id": id,
//                     "userId": parseInt(fields.userId),
//                     "name": fields.name, // 文章分类
//                     "date": date
//                 }, function (err, result) {
//                     if (err) {
//                         res.send("-1");
//                         return;
//                     }
//                     res.send("1");
//                 });
//             });
//         });
//     });
// }
// // 删除标签
// exports.delTag = function (req, res, next) {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//         var name = fields.name;
//         db.deleteMany("tag", {
//             "name": name
//         }, function (err, results) {
//             if (err) {
//                 console.log("删除标签错误:" + err);
//                 return
//             }
//             res.send("1");
//         });
//     });
// }

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

// //无判断访问者地理位置！
// exports.getAddress = function (req, res, result) {
//     //得到用户填写的东西
//     var form = new formidable.IncomingForm();
//     var ipAddress = getClientIp(req);

//     form.parse(req, function(err, fields, files) {
//         var cxipAddress = fields.cxipAddress;
//         var cxIsp = fields.cxIsp;
//         var cxBrowser = fields.cxBrowser;
//         var cxOS = fields.cxOS;
//         var gdIsp = fields.gdIsp;

//         db.getAllCount("Visitor", function (count) {
//             var allCount = count.toString();
//             var date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
//             //写入数据库
//             db.insertOne("Visitor", {
//                 "ID" : parseInt(allCount) + 1,
//                 "ipAddress" : ipAddress,
//                 "cxipAddress" : cxipAddress ? cxipAddress : "查询网无法查询",
//                 "cxIsp" : cxIsp ? cxIsp : "查询网无法定位",
//                 "cxBrowser" : cxBrowser ? cxBrowser :"查询网无法识别游览器",
//                 "cxOS" : cxOS ? cxOS :"查询网无法识别系统",
//                 "gdIsp" : gdIsp ? gdIsp : "高德无法定位",
//                 "date" : date
//             },function (err, result) {
//                 if(err){
//                     console.log("服务器错误" + err);//服务器错误
//                     return;
//                 }
//                 console.log("有人访问Scott主页啦！");
//                 res.send("1");
//             });
//         });
//     });
// };
// //无判断访问者地理位置

// //访问用户数据！
// exports.showUserdata = function (req, res, result) {
//     if(req.session.login != "1"){
//         res.send("请登陆！");
//     }else {
//         res.render("userdata");
//     }
// };
// //获取用户信息
// exports.getUserdata = function (req, res ,result) {
//     var page = req.query.page;
//     db.find("user",{
//         "id": page.userId
//     },{"pageamount":10,"page":page,"sort":{"date":-1}}, function (err, result) {
//         var obj = {"allResult" : result};
//         res.json(obj);
//     });
// };
// exports.countUserdata = function (req, res ,result) {
//     db.getAllCount("Visitor", function (count) {
//         res.send(count.toString());
//     });
// };

// exports.delUserdata = function (req, res, result) {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function(err, fields, files) {
//         var ID = parseInt(fields.ID);
//         db.deleteMany("Visitor",{"ID":ID},function (err,results) {
//             if(err){
//                 console.log("删除访问用户数据错误:"+err);
//                 return
//             }
//             res.send("1");
//         });

//     });
// };
// //访问用户数据
// //后台页面

// //JavaScript!
// exports.showJavaScript = function (req, res, result) {
//     res.render("JavaScript");
// };

// exports.getJavaScript = function (req, res, next) {
//     db.find("article",{"classify":"JavaScript"},{"pageamount":10,"sort":{"date":-1}}, function (err, result) {
//         if(err){
//             console.log(err);
//         }
//         var obj = {"allResult" : result};
//         res.json(obj);
//     });
// };
// //JavaScript

// //NodeJS!
// exports.showNodeJS = function (req, res, result) {
//     res.render("NodeJS");
// };

// exports.getNodeJS = function (req, res, next) {
//     db.find("article",{"classify":"NodeJS"},{"pageamount":10,"sort":{"date":-1}}, function (err, result) {
//         if(err){
//             console.log(err);
//         }
//         var obj = {"allResult" : result};
//         res.json(obj);
//     });
// };
// //NodeJS

// //Environment!
// exports.showEnvironment = function (req, res, result) {
//     res.render("Environment");
// };

// exports.getEnvironment = function (req, res, next) {
//     db.find("article",{"classify":"Environment"},{"pageamount":10,"sort":{"date":-1}}, function (err, result) {
//         if(err){
//             console.log(err);
//         }
//         var obj = {"allResult" : result};
//         res.json(obj);
//     });
// };
// //Environment

// //About!
// exports.showAbout = function (req, res ,result) {
//     res.render("about");
// };
// //About

// //Comment!
// exports.showComment = function (req, res ,result) {
//     res.render("comment");
// };
// exports.doComment = function (req, res, result) {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//         var parentId = fields.parentId ? fields.parentId : null;
//         var commentText = fields.commentText;
//         var commentUserId = fields.commentUserId;
//         // var commentUserName = fields.commentUserName;
//         var articleId = fields.articleId;
//         var toUserId = fields.toUserId ? fields.toUserId : null;
//         // var toUserName = fields.toUserName;
//         db.updateOne("counters", {"_id":"commentId"}, function (result) {
//             if (result !== "success") return;
//             db.find("counters", {"_id":"commentId"}, function (err, result){
//                 var id = result[0].sequence_value;
//                 var date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
//                 db.insertOne("comment", {
//                     "id" : id,  //评论id
//                     "parentId": parseInt(parentId), //回复id
//                     "commentText": commentText, //评论内容  
//                     "commentUserId": parseInt(commentUserId), //评论者id
//                     "date" : date,
//                     "articleId": parseInt(articleId), //评论文章id
//                     "toUserId": parseInt(toUserId), // 回复者id
//                     "likeNum": 0, // 总点赞数
//                     "replyNum": 0, // 总回复数
//                     "status": 1, // 状态 -1：已删除 1：已发布 0：待审核
//                 },function (err, result) {
//                     if(err){
//                         console.log("留言错误" + err);
//                         return;
//                     }
//                     res.send("1");
//                 });
//             });
//         });
//     });
// };
// //点赞评论
// exports.pointComment = function(req, res, next){
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//         var commentId = fields.commentId;
//         db.updateMany("comment",{
//             "id": parseInt(commentId),
//         }, {
//             $inc: {"likeNum":1}
//         }, function(err, result){
//             if(err){
//                 console.log("留言错误" + err);
//                 return;
//             }
//             res.send("1");
//         })
//     })
// }

// //取得评论
// exports.getComment = function (req, res, next) {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//         var articleId = fields.articleId;
//         db.aggregate("comment", { //直接合并两张表，导致不需要的数据很多
//             from: "user",
//             localField: "commentUserId",
//             foreignField: "id",
//             as: "commentUserInfo"
//         }, function (err, result) {
//             let commentInfo = [];
//             result.map(function(val, index){
//                 if(val.articleId == articleId){
//                     commentInfo.push(val);
//                 }
//             })
//             var obj = {
//                 "allResult": commentInfo
//             };
//             res.json(obj);
//         })
//     });
// };

// exports.populate = function(req, res, next){
//     db.populate();
//     res.send("populate");
// }

// //取得评论总页数   ???下拉至底部才获取内容
// exports.getAllCountComment = function (req, res, next) {
//     db.getAllCount("comment", function (count) {
//         res.send(count.toString());
//     });
// };
// //Comment

// //blog-manage!
// exports.getManage = function (req, res, result) {
//     if(req.session.login != "1"){
//         res.send("请登陆！");
//     }else {
//         res.render("manage");
//     }
// };
// //blog-manage

// //addVisitorNum!
// exports.addVisitorNum = function (req, res, result) {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function(err, fields, files) {
//         var aId = parseInt(fields.ID);
//         db.find("article",{"ID":aId},function (err,result) {
//             if(err){
//                 console.log(err);
//             }
//             var visitNum = result[0].visitNum;
//             var ID = result[0].ID;
//             db.updateMany("article",{"ID":ID},{$set:{"visitNum":visitNum+1}},function (err,results) {
//                 if(err){
//                     console.log("游览数据错误:"+err);
//                     return
//                 }
//                 res.send("1");
//             });
//         });
//     });
// };
// //addVisitorNum

// //addThumbsUp!
// exports.addThumbsUp = function (req,res,result) {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function(err, fields, files) {
//         var aId = parseInt(fields.ID);
//         db.find("article",{"ID":aId},function (err,result) {
//             if(err){
//                 console.log(err);
//             }
//             var thumbsUp = result[0].thumbsUp;
//             var ID = result[0].ID;
//             db.updateMany("article",{"ID":ID},{$set:{"thumbsUp":thumbsUp+1}},function (err,results) {
//                 if(err){
//                     console.log("点赞数据错误:"+err);
//                     return
//                 }
//                 res.send("1");
//             });
//         });
//     });
// };


// //addThumbsUp


// //获取客户端真实ip;
// function getClientIp(req) {
//     var ipAddress;
//     var forwardedIpsStr = req.headers['X-Forwarded-For'];//判断是否有反向代理头信息
//     if (forwardedIpsStr) {//如果有，则将头信息中第一个地址拿出，该地址就是真实的客户端IP；
//         var forwardedIps = forwardedIpsStr.split(',');
//         ipAddress = forwardedIps[0];
//     }
//     if (!ipAddress) {//如果没有直接获取IP；
//         ipAddress = req.connection.remoteAddress;
//     }
//     return ipAddress;
// }








