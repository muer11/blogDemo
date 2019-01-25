const formidable = require('formidable');
const express = require("express");
const router = express.Router();
const Tag = require("../model/tag");
const Counter = require("../model/counter");

//显示标签-前台
router.get("/showTagsFore", function (req, res) {
    Tag.find({
        // "userId": parseInt(userId),
    }, function (err, result) {
        if (err) {
            console.log("查找标签错误：" + err);
            return;
        }
        var allTags = {
            "allTags": result
        };
        res.json(allTags);
    });
});

// 显示标签-后台
router.get("/showTags", function(req, res){
    var userId = req.query.userId;
    console.log(userId);
    Tag.find({
        "userId": parseInt(userId),
    }, function (err, result) {
        if (err) {
            console.log("查找标签错误：" + err);
            return;
        }
        var allTags = {
            "allTags": result
        };
        res.json(allTags);
    });
})

// 添加标签
router.post("/addTag", function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, result) {
        var reqRsult = result;
        Counter.updateOne({
            "_id": "tagId"
        }, {
            $inc: {
                "sequence_value": 1
            }
        },function (err, result) {
            if (err) {
                res.send("-1");
                return;
            }
            Counter.find({
                "_id": "tagId"
            }, function (err, result) {
                var id = result[0].sequence_value;
                console.log(id);
                Tag.create({
                    "id": id,
                    "userId": parseInt(reqRsult.userId),
                    "name": reqRsult.name, // 文章分类名
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
})

router.post('/delTag', function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, result) {
        var id = result.id;
        Tag.deleteOne({
            "id": parseInt(id)
        }, function (err, results) {
            if (err) {
                console.log("删除标签错误:" + err);
                return
            }
            res.send("1");
        });
    });
})

module.exports = router;