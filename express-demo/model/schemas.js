var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//定义数据模式 统一：一律涉及id的都为Number类型
//用户表user
var UserSchema = new mongoose.Schema({
    id: Number,
    username: String,
    password: String,
    email: String,
    phone: String,
    residence: String,
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
//评论表comment
var CommentSchema = new mongoose.Schema({
    id: Number,
    parentId: Number, //评论id
    commentText: String, //回复内容
    commentUserId: String, //回复者(session)
    articleId: Number, //文章编号
    toUserId: {  //评论对象
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    likeNum: Number, //点赞人数
    // likeReader: Array,
    replyNum: Number, //回复人数
    // replyReader: Array,
    status: Number, //状态1：发表
    date: {
        createAt:{
            type: Date,
             default: Date.now()
        },
        updateAt:{
            type: Date,
            default: Date.now()
        }
    }
});
//文章表article
var ArticleSchema = new mongoose.Schema({
    id: Number,
    userId: Number,
    tagId: Number,
    title: String,
    content: String,
    like: Number,
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
//标签表tag
var TagSchema = new mongoose.Schema({
    id: Number,
    userId: Number,
    name: String,
    date:{
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
//计数表counters
var CountersSchema = new mongoose.Schema({
    _id: String,
    sequence_value: Number
});

let Schemas = {
    UserSchema: UserSchema,
    CommentSchema: CommentSchema,
    ArticleSchema: ArticleSchema,
    TagSchema: TagSchema,
    CountersSchema: CountersSchema
}

module.exports = Schemas;