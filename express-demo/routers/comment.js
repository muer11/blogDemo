const formidable = require('formidable');
const express = require("express");
const router = express.Router();
var User = require("../model/user");
var Comment = require("../model/comment");

//发表评论
router.post("/doComment", function (req, res, result) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var parentId = fields.parentId ? fields.parentId : null;
        var commentText = fields.commentText;
        var commentUserId = req.session.userid;
        // var commentUserId = fields.commentUserId;
        // var commentUserName = fields.commentUserName;
        var articleId = fields.articleId;
        var toUserId = fields.toUserId ? fields.toUserId : null;
        Comment.create({
            "parentId": parentId, //回复id
            "commentText": commentText, //评论内容  
            "commentUserId": commentUserId, //评论者id
            "articleId": articleId, //评论文章id
            "toUserId": toUserId, // 回复者id
            "createAt": new Date(),
            // "likeNum": 0, // 总点赞数
            // "replyNum": 0, // 总回复数
            // "status": 1, // 状态 -1：已删除 1：已发布 0：待审核
        },function (err, result) {
            if(err){
                // console.log("留言错误" + err);
                res.json({
                    success: false,
                    code: 100,
                    msg: "留言失败",
                    data: null
                });
                return;
            }
            // res.send("1");
            res.json({
                success: true,
                code: 000,
                msg: "留言成功",
                data: null
            });
        });
    });
});

//点赞评论
router.post("/pointComment", function(req, res, next){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var commentId = fields.commentId;
        Comment.updateMany({
            "_id": commentId,
        }, {
            $inc: {"likeNum":1}
        }, function(err, result){
            if(err){
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

//获取评论
router.get("/getComment", function (req, res, next) {
    var articleId = req.query.articleId;
    Comment.find({
        "articleId": articleId
    }).populate({
        path: "commentUserId",
        select: 'username'
    }).exec(function (err, result) {
        if(err){
            res.json({
                success: false,
                code: 100,
                msg: "无法获取相关数据",
                data: null
            });
            return;
        }
        
        let commentInfo = [];
        result.map(function (val, index) {
            if (val.articleId == articleId) {
                commentInfo.push(val);
            }
        });
        res.json({
            success: true,
            code: 000,
            msg: "获取评论成功",
            data: {
                "allResult": commentInfo
            }
        });
    });  
});
module.exports = router;