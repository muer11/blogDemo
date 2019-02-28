const formidable = require('formidable');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Tag = require("../model/tag");
const Counter = require("../model/counter");

//显示标签-前台
// router.get("/showTagsFore", function (req, res) {
//     Tag.find({
//         // "userId": parseInt(userId),
//     }, function (err, result) {
//         if (err) {
//             console.log("查找标签错误：" + err);
//             return;
//         }
//         let tagIdArr = [];
//         let resultArr = [];
//         result.map((val, index)=>{
//             if (tagIdArr.indexOf(val.name) < 0){
//                 tagIdArr.push(val.name);
//                 resultArr.push(val);
//             }
//         })
//         console.log(resultArr);
//         var allTags = {
//             "allTags": resultArr
//         };
//         res.json(allTags);
//     });
// });

//显示标签
router.get("/showTags", function(req, res){
    // var userId = req.query.userId;
    // console.log(mongoose.Types.ObjectId(userId));
    // console.log(userId);
    Tag.find({
        // "userId": userId,
    }, function (err, result) {
        if (err) {
            console.log("查找标签错误：" + err);
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
        console.log(resultArr);
        var allTags = {
            "allTags": resultArr
        };
        res.json(allTags);
    });
})

//添加标签
router.post("/addTag", function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, result) {
        var reqRsult = result;
        // Counter.updateOne({
        //     "_id": "tagId"
        // }, {
        //     $inc: {
        //         "sequence_value": 1
        //     }
        // },function (err, result) {
        //     if (err) {
        //         res.send("-1");
        //         return;
        //     }
        //     Counter.find({
        //         "_id": "tagId"
        //     }, function (err, result) {
        //         var id = result[0].sequence_value;
        //         console.log(id);
        // console.log(mongoose.Types.ObjectId(reqRsult.userId));
                Tag.create({
                    // "id": id,
                    "userId": reqRsult.userId,
                    "name": reqRsult.name, // 文章分类名
                }, function (err, result) {
                    if (err) {
                        res.send("-1");
                        return;
                    }
                    res.send("1");
                });
        //     });
        // });
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
                console.log("删除标签错误:" + err);
                return
            }
            res.send("1");
        });
    });
})

module.exports = router;