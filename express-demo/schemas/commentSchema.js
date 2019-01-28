var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//评论表comment
var CommentSchema = new mongoose.Schema({
    // id: Number,
    _id: {
        type: Schema.ObjectId,
    },
    parentId: { //评论id
        type: Schema.ObjectId,
    }, 
    commentText: String, //回复内容
    commentUserId: { //回复者(session)
        type: Schema.ObjectId,
        ref: 'user',
     },
    articleId: { //文章编号
        type: Schema.ObjectId,
    },
    toUserId: { //评论对象
        type: Schema.ObjectId,
        ref: 'user'
    },
    likeNum: Number, //点赞人数
    // likeReader: Array,
    replyNum: Number, //回复人数
    // replyReader: Array,
    status: Number, //状态1：发表
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

module.exports = CommentSchema;