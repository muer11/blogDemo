const formidable = require('formidable');
const express = require("express");
const router = express.Router();
const Like = require("../model/like");

//点赞
router.post("/doLike", function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, result) {
        var articleId = result.articleId ? result.articleId : null;
        var commentId = result.commentId ? result.commentId : null;
        var userId = req.session.userid;
        Like.find({
            articleId, commentId, userId
        }, (err, result)=>{
            if (err) {
                res.json({
                    success: false,
                    code: 100,
                    msg: "点赞失败",
                    data: null
                });
                return;
            }
            if(result.length == 0){ 
                // 未点赞的则新增点赞记录
                Like.create({
                    userId, articleId, commentId
                },(err, result)=>{
                    if (err) {
                        res.json({
                            success: false,
                            code: 100,
                            msg: "点赞失败",
                            data: {
                                isLike: true
                            }
                        });
                        return;
                    }
                    res.json({
                        success: true,
                        code: 000,
                        msg: "已点赞",
                        data: {
                            isLike: true
                        }
                    });
                })
            }else{
                //已点赞的便取消点赞
                Like.deleteMany({
                    userId, articleId, commentId
                },(err, result)=>{
                    if (err) {
                        res.json({
                            success: false,
                            code: 100,
                            msg: "取消点赞失败",
                            data: null
                        });
                        return;
                    }
                    res.json({
                        success: true,
                        code: 000,
                        msg: "已取消点赞",
                        data: {
                            isLike: false
                        }
                    });
                })
            }
        });
    });
});

//单个文章或评论的点赞总数
router.get("/sumLike", function (req, res) {
    console.log(req.query);
    var articleId = req.query.articleId ? req.query.articleId : null;
    var commentId = req.query.commentId ? req.query.commentId : null;
    var userId = req.session.userid ? req.session.userid : null;
    Like.find({
        articleId, commentId
    }, (err, result)=>{
        if (err) {
            res.json({
                success: false,
                code: 100,
                msg: "获取点赞总数失败",
                data: null
            });
            return;
        }
        var allResult = result.length;
       
        if (userId){
            //用户已登录，则判断其是否已点赞
            Like.find({
                articleId, commentId, userId
            }, (err, result) => {
                if (err) {
                    res.json({
                        success: false,
                        code: 100,
                        msg: "获取点赞失败",
                        data: null
                    });
                    return;
                }
                if(result.length > 0){
                    res.json({
                        success: true,
                        code: 000,
                        msg: "点赞总数",
                        data: {
                            sumLike: allResult,
                            isLike: true
                        }
                    });
                }
            });
        }else{
            res.json({
                success: true,
                code: 000,
                msg: "点赞总数",
                data: {
                    sumLike: allResult,
                    isLike: false
                }
            });
        }
        
    })
});

module.exports = router;