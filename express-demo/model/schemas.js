var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//定义数据模式
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
    parentId: String,
    commentText: String,
    commentUserId: String,
    articleId: String,
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
    userId: String,
    tagId: String,
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

});
//计数表counters
var CountersSchema = new Schema({

});

let Schemas = {
    UserSchema: UserSchema,
    CommentSchema: CommentSchema,
}

module.exports = Schemas;