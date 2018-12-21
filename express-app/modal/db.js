// 描述了所有数据库操作
var MongoClient = require('mongodb').MongoClient;
var settings = require('./setting.js');

function _connectDB(callback){
    var url = settings.dburl;
    // 连接数据库
    MongoClient.connect(url, function(err, db){
        if(err){
            callback(err, null);
            return;
        }
        callback(err, db);
    })
}

// 插入数据
exports.insertOne = function(collectionName, json, callback){
    _connectDB(function(err, db){
        db.connect(collectionName).insertOne(json, function(err, result){
            callback(err, result);
            db.close(); // 关闭数据库，因为每一条连接对数据库造成一定的压力，如果不释放这些空闲的压力，数据库将会很卡
        })
    })
};

// 查找数据
exports.find = function(collectionName, json, C, D){
    var result = []; //结果数组
    if(arguments.length == 3){
        var callback = C;
        var skipnumber = 0;
        var limit = 0;
    }else if(arguments.length == 4){
        var callback = D;
        var args = C;
        var skipnumber = args.pageamount * args.page || 0;  // 应该省略的条数
        var limit = args.pageamount || 0; // 数目限制
        var sort = args.sort || {}; // 排序方式
    }else{
        throw new Error('find函数的参数个数，必须是3个，或者是4个');
        return;
    }

    // 连接数据库，连接之后查找所有
    _connectDB(function(err, db){
        var cursor = db.collection(collectionName).find(json).skip(skipnumber).limit(limit).sort(sort);
        cursor.each(function(err, doc){
            if(err){
                callback(err, null);
                db.close(); // 关闭数据库
                return;
            }
            if(doc != null){
                result.push(doc); // 放入结果数组
            }else{
                callback(null, result); // 遍历结束
                db.close(); // 关闭数据库
            }
        })
    })
}

// 删除数据
exports.deleteMany = function(collectionName, json, callback){
    _connectDB(function(err, db){
        //删除
        db.collection(collectionName).deleteMany(
            json,
            function(err, results){
                callback(err, results);
                db.close(); // 关闭数据库
            }
        )
    })
}

// 修改
exports.updateMany = function(collectionName, json1, json2, callback){
    _connectDB(function(err, db){
        db.collection(collectionName).updateMany(
            json1,
            json2,
            function(err, results){
                callback(err, results);
                db.close();
            }
        )
    })
}

// 分页
exports.getAllCount = function(collectionName, callback){
    _connectDB(function(err, db){
        db.collection(collectionName).count({}).then(function(count){
            callback(count);
            db.close();
        })
    })
}