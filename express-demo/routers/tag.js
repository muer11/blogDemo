const express = require("express");
const router = express.Router();
const formidable = require('formidable');
const Tag = require("../model/tag");

//显示标签
router.get("/showTags", function(req, res){
    Tag.find({}, function (err, result) {
        if (err) {
            res.json({
                success: false,
                code: 100,
                msg: "查不到相关数据",
                data: null
            });
            return;
        }
        let tagIdArr = [];
        let resultArr = [];
        result.map((val, index) => {
            if (tagIdArr.indexOf(val.name) < 0) {
                tagIdArr.push(val.name);
                resultArr.push(val);
            }
        })
        res.json({
            success: true,
            code: 000,
            msg: "成功查询到所有标签",
            data: {
                "allTags": resultArr
            }
        });
    });
})

//添加标签
router.post("/addTag", function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, result) {
        var reqRsult = result;
        Tag.create({
            "userId": reqRsult.userId,
            "name": reqRsult.name, // 文章分类名
            "createAt": new Date(),
        }, function (err, result) {
            if (err) {
                res.json({
                    success: false,
                    code: 100,
                    msg: "添加标签失败",
                    data: null
                });
                return;
            }
            res.json({
                success: true,
                code: 000,
                msg: "成功添加标签",
                data: {
                    "name": reqRsult.name
                }
            });
        });
    });
})

//删除标签
router.post('/delTag', function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, result) {
        var _id = result.id;
        Tag.deleteOne({
            "_id": _id
        }, function (err, results) {
            if (err) {
                res.json({
                    success: false,
                    code: 100,
                    msg: "删除标签失败",
                    data: null
                });
                return;
            }
            res.json({
                success: true,
                code: 000,
                msg: "成功删除标签",
                data: null
            });
        });
    });
})

module.exports = router;