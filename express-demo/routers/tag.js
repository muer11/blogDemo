const express = require("express");
const router = express.Router();
var Tag = require("../model/tag");

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

// 显示标签-前台
exports.showTagsFore = function (req, res, next) {
    db.find("tag", {
        // "userId": parseInt(userId),
    }, {
        "pageamount": 200,
        "page": 0,
        "sort": {
            "id": 1
        }
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
}
// 显示标签-后台
exports.showTags = function (req, res, next) {
    var userId = req.query.userId;
    console.log(userId);
    db.find("tag", {
        "userId": parseInt(userId),
    }, {
        "pageamount": 200,
        "page": 0,
        "sort": {
            "id": 1
        }
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
}

// 添加标签
exports.addTag = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        var date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        // mongodb非关系型数据库，counters中记录了每张表的id
        db.updateOne("counters", {
            "_id": "tagId"
        }, function (result) {
            if (result !== "success") return;
            db.find("counters", {
                "_id": "tagId"
            }, function (err, result) {
                var id = result[0].sequence_value;
                db.insertOne("tag", {
                    "id": id,
                    "userId": parseInt(fields.userId),
                    "name": fields.name, // 文章分类
                    "date": date
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
}
// 删除标签
exports.delTag = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var name = fields.name;
        db.deleteMany("tag", {
            "name": name
        }, function (err, results) {
            if (err) {
                console.log("删除标签错误:" + err);
                return
            }
            res.send("1");
        });
    });
}


module.exports = router;