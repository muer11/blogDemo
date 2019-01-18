var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//定义数据模式 统一：一律涉及id的都为Number类型
//用户表user
var UserSchema = new Schema({
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
var CommentSchema = new Schema({
    id: Number,
    parentId: Number,
    commentText: String,
    commentUserId: String,
    articleId: Number,
    toUserId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    likeNum: Number,
    replyNum: Number,
    status: Number,
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
var ArticleSchema = new Schema({
    id: Number,
    userId: Number,
    tagId: Number,
    title: String,
    content: String,
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
var TagSchema = new Schema({
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
var CountersSchema = new Schema({
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