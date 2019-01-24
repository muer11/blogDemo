var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//文章表article
var ArticleSchema = new mongoose.Schema({
    // _id: {
    //     type: Schema.Types.objectId,
    // },
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

module.exports = ArticleSchema;