//这个模块里面封装了所有对数据库的常用操作
var MongoClient = require('mongodb').MongoClient;
var settings = require("../config/config");
var User = require("./user.js");
// var User = require("./model.js").User;
// var Comment = require("./model.js").Comment;
// var User = require("../model/user.js");

//不管数据库什么操作，都是先连接数据库，所以我们可以把连接数据库
//封装成为内部函数
function _connectDB(callback) {
    var url = settings.dburl;   //从settings文件中，都数据库地址
    //连接数据库
    MongoClient.connect(url, function (err, db) {
        if (err) {
            callback(err, null);
            return;
        }
        callback(err, db);
    });
}

//测试
exports.test = function (json, callback) {
    _connectDB(function (err, db) {
        // console.log(User);
        console.log("------------------")
        // console.log(json);
        // console.log("------------------")
        User.find({}).then(function (err, result) {
            console.log("model.........");
            callback(err, result);
            db.close(); //关闭数据库
        })
    })
}

//插入数据 (指定不可重复的字段：tag-name???)
exports.insertOne = function (collectionName, json, callback) {
    _connectDB(function (err, db) {
        db.collection(collectionName).insertOne(json, function (err, result) {
            callback(err, result);
            db.close(); //关闭数据库
        })
    })
};

//查找数据，找到所有数据。args是个对象{"pageamount":10,"page":10}
exports.find = function (collectionName, json, C, D) {
    var result = [];    //结果数组
    if (arguments.length == 3) {
        //那么参数C就是callback，参数D没有传。
        var callback = C;
        var skipnumber = 0;
        //数目限制
        var limit = 0;
    } else if (arguments.length == 4) {
        var callback = D;
        var args = C;
        //应该省略的条数
        var skipnumber = args.pageamount * args.page || 0;
        //数目限制
        var limit = args.pageamount || 0;
        //排序方式
        var sort = args.sort || {};
    } else {
        throw new Error("find函数的参数个数，必须是3个，或者4个。");
        return;
    }

    //连接数据库，连接之后查找所有
    _connectDB(function (err, db) {
        var cursor = db.collection(collectionName).find(json).skip(skipnumber).limit(limit).sort(sort);
        cursor.each(function (err, doc) {
            if (err) {
                callback(err, null);
                db.close(); //关闭数据库
                return;
            }
            if (doc != null) {
                result.push(doc);   //放入结果数组
            } else {
                //遍历结束，没有更多的文档了
                callback(null, result);
                db.close(); //关闭数据库
            }
        });
    });
};

//删除
exports.deleteMany = function (collectionName, json, callback) {
    _connectDB(function (err, db) {
        //删除
        db.collection(collectionName).deleteMany(
            json,
            function (err, results) {
                callback(err, results);
                db.close(); //关闭数据库
            }
        );
    });
};

//修改
exports.updateMany = function (collectionName, json1, json2, callback) {
    _connectDB(function (err, db) {
        db.collection(collectionName).updateMany(
            json1,
            json2,
            function (err, results) {
                callback(err, results);
                db.close();
            });
    });
};

//获取总量
exports.getAllCount = function (collectionName,callback) {
    _connectDB(function (err, db) {
        db.collection(collectionName).count({}).then(function(count) {
            callback(count);
            db.close();
        });
    })
};

// 更新counters计数（非关系型mongodb）
exports.updateOne = function (collectionName, json, callback) {
    var _this = this;
    _connectDB(function (err, db) {
        db.collection(collectionName).updateOne(
            json,
            {
                $inc: {
                    "sequence_value": 1
                }
            },
            function (err, res) {
                if(err) throw err;
                callback("success");
                db.close();
            }
        );
    })
}

// 连表查询 populate
exports.aggregate = function (collectionName, json, callback) {
    var _this = this;
    _connectDB(function(err, db){
        db.collection(collectionName).aggregate([{
            $lookup: json
        }]).toArray(function (err, res) {
            if (err) throw err;
            callback(err, res);
            db.close();
        })

        // Comment.find({"commentUserId":1}).populate({   //尝试用schema来做
        //     path: 'toUserId',
        //     select: 'username',
        //     model: 'user',
        // }).then(function(err, result){
        //     console.log(22222222222)
        //     console.log(result)
        // }).catch(function(reason){
        //     console.log(reason);
        // })
    })
}