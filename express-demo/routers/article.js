const express = require("express");
const router = express.Router();
var Article = require("../model/article");
var Counters = require("../model/counters");

router.get("/doRecording", function (req, res) {
    // console.log("-----------test---------------");
    // User.find({}, (err, result) => {
    //     console.log("result.............")
    //     if (err) {
    //         res.send("server or db error");
    //     }
    //     console.log(result);
    //     res.send(result);
    // });
    // res.send("-----------test---------------");
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, result) {
        console.log(result);
        Counters.updateOne({
            "_id": "articleId"
        }, function (result) {
            if (result !== "success") return;
            Counters.find({
                "_id": "articleId"
            }, function (err, result) {
                var id = result[0].sequence_value;
                var date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                //写入数据库
                Article.insertOne({
                    "id": id,
                    "userId": result.userId,
                    "tagId": result.tagId, // 文章分类
                    "title": result.title, // 文章标题
                    "content": result.content, // 文章正文
                    "date": date,
                    "isPublished": result.isPublished, // 已发布或草稿箱
                    "visitNum": 0, //浏览数
                    "likeNum": 0 //点赞数
                }, function (err, result) {
                    if (err) {
                        res.send("-1");
                        return;
                    }
                    res.send("1");
                });
            });
        });
    });
});

module.exports = router;


// //编写页面
// exports.showRecording = function (req, res, next) {
//     if (req.session.login != "1") {
//         res.send("请登陆！");
//     } else {
//         res.render("recording");
//     }
// };

// // 发表文章（新建）
// exports.doRecording = function (req, res, next) {
//     // console.log(req);
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, result) {
//         console.log(result);
//         // res.send("发表成功");
//         // db.getAllCount("article", function (count) {
//         //     var allCount = count.toString();
//         db.updateOne("counters", {
//             "_id": "articleId"
//         }, function (result) {
//             if (result !== "success") return;
//             db.find("counters", {
//                 "_id": "articleId"
//             }, function (err, result) {
//                 var id = result[0].sequence_value;
//                 var date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
//                 //写入数据库
//                 db.insertOne("article", {
//                     "id": id,
//                     "userId": result.userId,
//                     "tagId": result.tagId, // 文章分类
//                     "title": result.title, // 文章标题
//                     "content": result.content, // 文章正文
//                     "date": date,
//                     "isPublished": result.isPublished, // 已发布或草稿箱
//                     "visitNum": 0, //浏览数
//                     "likeNum": 0 //点赞数
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
// };
// // 编辑文章
// exports.editRecording = function (req, res, next) {
//     // console.log(req);
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, result) {
//         console.log(result);
//         //更新数据库
//         var date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
//         db.updateMany("article", {
//             "id": parseInt(result.articleId),
//         }, {
//             $set: {
//                 "tagId": result.tagId, // 文章分类
//                 "title": result.title, // 文章标题
//                 "content": result.content, // 文章正文
//                 "isPublished": result.isPublished, // 已发布或草稿箱
//                 "updateDate": date,
//                 // "visitNum": 0, //浏览数
//                 // "likeNum": 0 //点赞数
//             }
//         }, function (err, result) {
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
//             break;
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
//     if (req.query.articleId == undefined) {
//         res.send("你想干嘛？");
//         return;
//     }
//     var aId = parseInt(req.query.ID);
//     db.find("article", {
//         "ID": aId
//     }, function (err, result) {
//         if (err) {
//             console.log(err);
//         }
//         res.render("article", {
//             "allResult": result[0]
//         });
//     });
// };

// //删除文章
// exports.delArticle = function (req, res, result) {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, result, files) {
//         var articleId = parseInt(result.articleId);
//         db.deleteMany("article", {
//             "id": articleId
//         }, function (err, results) {
//             if (err) {
//                 console.log("删除文章错误:" + err);
//                 return
//             }
//             res.send("1");
//         });
//     });
// };

// //点赞文章
// exports.pointArticle = function (req, res, next) {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, result, files) {
//         var articleId = result.articleId;
//         db.updateMany("article", {
//             "id": parseInt(articleId),
//         }, {
//             $inc: {
//                 "likeNum": 1
//             }
//         }, function (err, result) {
//             if (err) {
//                 console.log("文章点赞错误" + err);
//                 return;
//             }
//             res.send("1");
//         })
//     })
// }