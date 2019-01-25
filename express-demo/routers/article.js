const formidable = require('formidable');
const express = require("express");
const router = express.Router();
var Article = require("../model/article");
var Counter = require("../model/counter");

// 发表文章（新建）
router.post("/doRecording", function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, result) {
        const reqResult = result;
        //写入失败也会导致对应的counter增加  ？？？
        Counter.updateOne({
            "_id": "articleId"
        }, {
            $inc: {
                "sequence_value": 1
            }
        }, function (err, result) {
            if (err) {
                res.send("-1");
                return;
            }
            Counter.find({
                "_id": "articleId"
            }, function (err, result) {
                if (err) {
                    res.send("-1");
                    return;
                }
                console.log(result);
                var id = result[0].sequence_value;
                //写入数据库
                Article.create({
                    "id": id,
                    "userId": reqResult.userId,
                    "tagId": reqResult.tagId, // 文章分类
                    "title": reqResult.title, // 文章标题
                    "content": reqResult.content, // 文章正文
                    "isPublished": reqResult.isPublished, // 已发布或草稿箱
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

// 编辑文章
router.post("/editRecording", function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, result) {
        console.log(result);
        //更新数据库
        Article.updateMany({
            "id": parseInt(result.articleId),
        }, {
            $set: {
                "tagId": parseInt(result.tagId), // 文章分类
                "title": result.title, // 文章标题
                "content": result.content, // 文章正文
                "isPublished": result.isPublished, // 已发布或草稿箱
            }
        }, function (err, result) {
            if (err) {
                res.send("-1");
                return;
            }
            res.send("1");
        });
    });
});

//取得文章
router.get("/getArticle", function (req, res) {
    var info = req.query;
    var userId = info.userId;
    var tagId = ((info.tagId && info.tagId !== "all") ? info.tagId : {
        $ne: null
    });
    var isPublished = info.isPublished;
    var page = info.page;
    var sortQuery = {};
    switch (info.sort) {
        case "visitNum":
            sortQuery = {
                "visitNum": -1
            }
            break;
        case "likeNum":
            sortQuery = {
                "likeNum": -1
            }
            break;
        default:
            sortQuery = {
                "date": -1
            }
            break;
    }
    Article.find({
        "userId": userId,
        "tagId": tagId,
        "isPublished": isPublished,
    }).sort(sortQuery).exec(function (err, result) {
        var obj = {
            "allResult": result
        };
        console.log(result);
        res.json(obj);
    });
});

//获取文章-前台
exports.getTagArticle = function (req, res, next) {
    var info = req.query;
    var tagId = ((info.tagId && info.tagId !== "all") ? info.tagId : {
        $ne: null
    });
    var isPublished = info.isPublished;
    var page = info.page ? info.page : 0;
    var sortQuery = {};
    switch (info.sort) {
        case "visitNum":
            sortQuery = {
                "visitNum": -1
            }
            break;
        case "likeNum":
            sortQuery = {
                "likeNum": -1
            }
            break;
        default:
            sortQuery = {
                "date": -1
            }
            break;
    }
    Article.find({
        "tagId": tagId,
        "isPublished": isPublished,
    }).sort(sortQuery).exec(function (err, result) {
        var obj = {
            "allResult": result
        };
        console.log(result);
        res.json(obj);
    });
};

//获取单篇文章
router.get("/findOneArticle", function (req, res) {
    if (req.query.articleId == undefined) {
        res.send("你想干嘛？");
        return;
    }
    var articleId = parseInt(req.query.articleId);
    Article.find({
        "id": articleId
    }).populate({
        path: "tagId",
        select: 'name'
    }).populate({
        path: "userId",
        select: 'username'
    }).exec(function (err, result) {
        if (err) {
            console.log(err);
        }
        var obj = {
            "allResult": result 
        };
        // user : ObjectId("5c481ca1a464d763b8e74b38")
        // tag: ObjectId("5c4984eaf1da12baaa627b03")
        console.log("obj-----------------")
        console.log(obj);
        res.json(obj);
    });
});

//删除文章
router.post("/delArticle", function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, result, files) {
        var articleId = parseInt(result.articleId);
        Article.deleteMany({
            "id": articleId
        }, function (err, results) {
            if (err) {
                console.log("删除文章错误:" + err);
                return
            }
            res.send("1");
        });
    });
});

// 为文章点赞
router.post("/pointArticle", function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, result, files) {
        var articleId = result.articleId;
        Article.updateMany({
            "id": parseInt(articleId),
        }, {
            $inc: {
                "likeNum": 1
            }
        }, function (err, result) {
            if (err) {
                console.log("文章点赞错误" + err);
                return;
            }
            res.send("1");
        })
    })
});

module.exports = router;







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

