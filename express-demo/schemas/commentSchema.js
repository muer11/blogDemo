var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//评论表comment
var CommentSchema = new mongoose.Schema({
    // id: Number,
    // _id: {
    //     type: Schema.ObjectId,
    // },
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
        ref: 'user',
    },
    likeNum: { //点赞人数
        type: Number,
        default: 0,
    },
    // likeReader: Array,
    replyNum: { //回复人数
        type: Number,
        default: 0,
    },
    // replyReader: Array,
    status: { //状态1：发表
        type: Number,
        default: 1,
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

module.exports = CommentSchema;