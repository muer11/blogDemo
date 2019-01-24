var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//评论表comment
var CommentSchema = new mongoose.Schema({
    id: Number,
    parentId: Number, //评论id
    commentText: String, //回复内容
    commentUserId: { //回复者(session)
        type: Number,
        ref: 'user',
     },
    articleId: Number, //文章编号
    toUserId: { //评论对象
        type: Number,
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