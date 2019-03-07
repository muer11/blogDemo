var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//文章表article
var likeSchema = new mongoose.Schema({
    // _id: {
    //     type: Schema.ObjectId,
    // },
    userId: {
        type: Schema.ObjectId,
        ref: 'user',
    },
    articleId: {
        type: Schema.ObjectId,
        ref: 'article',
    },
    commentId: {
        type: Schema.ObjectId,
        ref: 'comment',
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

module.exports = likeSchema;