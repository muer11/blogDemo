const express = require("express");
const router = express.Router();
const formidable = require('formidable');
var Article = require("../model/article");
var Like = require("../model/like");

// 发表文章（新建）
router.post("/doRecording", function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, result) {
        const reqResult = result;
        //写入数据库
        Article.create({
            // "id": id,
            "userId": req.session.userid,
            "tagId": reqResult.tagId, // 文章分类
            "title": reqResult.title, // 文章标题
            "content": reqResult.content, // 文章正文
            "isPublished": reqResult.isPublished, // 已发布或草稿箱
            "createAt": new Date(),
        }, function (err, result) {
            if (err) {
                res.json({
                    success: false,
                    code: 100,
                    msg: "发表文章失败",
                    data: null
                });
                return;
            }
            res.json({
                success: true,
                code: 000,
                msg: "成功发表文章",
                data: null
            });
        });
    });
});

// 编辑文章
router.post("/editRecording", function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, result) {
        // console.log(result);
        //更新数据库
        Article.updateMany({
            "_id": result.articleId,
        }, {
            $set: {
                "tagId": result.tagId, // 文章分类
                "title": result.title, // 文章标题
                "content": result.content, // 文章正文
                "isPublished": result.isPublished, // 已发布或草稿箱
                "updateAt": new Date(),
            }
        }, function (err, result) {
            if (err) {
                res.send("-1");
                res.json({
                    success: false,
                    code: 100,
                    msg: "编辑失败",
                    data: null
                });
                return;
            }
            res.json({
                success: true,
                code: 000,
                msg: "成功保存文章",
                data: null
            });
        });
    });
});

//获取所有文章
router.get("/getArticle", function (req, res) {
    var info = req.query;
    var userId = req.session.userid;
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
        if(err){
            res.json({
                success: false,
                code: 100,
                msg: "查不到相关数据",
                data: null
            });
            return;
        }
        res.json({
            success: true,
            code: 000,
            msg: "成功获取文章",
            data: {
                "allResult": result
            }
        });
    });
});

//获取分类文章-前台
router.get("/getTagArticle", function (req, res, next) {
    var info = req.query;
    var tagId = ((info.tagId && info.tagId !== "all") ? info.tagId : {
        $ne: null
    });
    var isPublished = info.isPublished;
    var page = info.page ? info.page : 0;
    var sortQuery = {};
    let responce = res;
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
    }).populate({
        path: "tagId",
        select: 'name'
    }).sort(sortQuery).exec(function (err, result) {
        if(err){
            responce.json({
                success: false,
                code: 100,
                msg: "查不到相关数据",
                data: null
            });
            return;
        }
        let promiseArr = [];
        result.map((val, index) => {
            promiseArr.push(new Promise(function (resolve, reject) {
                Like.find({
                    articleId: val._id
                },(err, res)=>{
                    if(err){
                        responce.json({
                            success: false,
                            code: 100,
                            msg: "查不到相关数据",
                            data: null
                        });
                        return;
                    }
                    // let isLiked = false;
                    // new Promise((rl, reject)=>{
                        if (req.session.userid){
                            Like.find({
                                articleId: val._id,
                                userId: req.session.userid
                            }, (err, r) => {
                                if (err) {
                                    responce.json({
                                        success: false,
                                        code: 100,
                                        msg: "查不到相关数据",
                                        data: null
                                    });
                                    return;
                                }
                                console.log("r:-----------------");
                                console.log(r);
                                if(r.length > 0){
                                    // isLiked = true;
                                    // rl(isLiked);
                                    resolve({
                                        id: val._id,
                                        title: val.title,
                                        likeNum: res.length,
                                        tagName: val.tagId.name,
                                        date: val.date.createAt,
                                        isLiked: true,
                                    })
                                }else{
                                    resolve({
                                        id: val._id,
                                        title: val.title,
                                        likeNum: res.length,
                                        tagName: val.tagId.name,
                                        date: val.date.createAt,
                                        isLiked: false,
                                    })
                                }
                            });
                        }else{
                            resolve({
                                id: val._id,
                                title: val.title,
                                likeNum: res.length,
                                tagName: val.tagId.name,
                                date: val.date.createAt,
                                isLiked: false,
                            })
                        }
                    // }).then(function (isLiked) {
                        
                    // })
                })
            }));
        })
        Promise.all(promiseArr).then((allArticles) => {
            responce.json({
                success: true,
                code: 000,
                msg: "成功获取文章",
                data: allArticles
            });
        }).catch((error)=>{
            console.log(error);
        })
    });
});

//获取单篇文章
router.get("/findOneArticle", function (req, res) {
    console.log(req);
    if (req.query.articleId == undefined) {
        res.send("你想干嘛？");
        return;
    }
    var articleId = req.query.articleId;
    Article.find({
        "_id": articleId
    }).populate({
        path: "tagId",
        select: 'name'
    }).populate({
        path: "userId",
        select: 'username'
    }).exec(function (err, result) {
        console.log(result);
        if (err) {
            res.json({
                success: false,
                code: 100,
                msg: "查不到相关数据",
                data: null
            });
            return;
        }
        res.json({
            success: true,
            code: 000,
            msg: "成功获取文章",
            data: {
                "allResult": result
            }
        });
    });
});

//删除文章
router.post("/delArticle", function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, result, files) {
        var articleId = result.articleId;
        Article.deleteMany({
            "_id": articleId
        }, function (err, results) {
            if (err) {
                res.json({
                    success: false,
                    code: 100,
                    msg: "删除文章失败",
                    data: null
                });
                return;
            }
            res.json({
                success: true,
                code: 000,
                msg: "成功删除文章",
                data: null
            });
        });
    });
});

// 为文章点赞
router.post("/pointArticle", function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, result, files) {
        var articleId = result.articleId;
        Article.updateMany({
            "_id": articleId,
        }, {
            $inc: {
                "likeNum": 1
            }
        }, function (err, result) {
            if (err) {
                res.json({
                    success: false,
                    code: 100,
                    msg: "点赞失败",
                    data: null
                });
                return;
            }
            res.json({
                success: true,
                code: 000,
                msg: "点赞成功",
                data: null
            });
        })
    })
});

module.exports = router;