var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//定义数据模式 统一：一律涉及id的都为Number类型
//用户表user
var UserSchema = new mongoose.Schema({
    // _id:{
    //     type: Schema.ObjectId,
    // },
    // id: Number,
    username: String,
    password: String,
    email: String,
    phone: String,
    residence: String,
    role:{
        type: Number,
        default: 0 //admin:1 user:0
    },
    date: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

module.exports = UserSchema;