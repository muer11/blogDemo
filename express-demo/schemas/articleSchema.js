var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//文章表article
var ArticleSchema = new mongoose.Schema({
    // _id: {
    //     type: Schema.ObjectId,
    // },
    // id: Number,
    userId: {
        // type: Number,
        type: Schema.ObjectId,
        ref: 'user',
    },
    tagId: {
        // type: Number,
        type: Schema.ObjectId,
        ref: 'tag',
    },
    title: String,
    content: String,
    isPublished: Boolean,
    visitNum: {
        type: Number,
        default: 0,
    },
    likeNum: {
        type: Number,
        default: 0,
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

module.exports = ArticleSchema;