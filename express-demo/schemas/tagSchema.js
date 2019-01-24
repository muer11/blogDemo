var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//标签表tag
var TagSchema = new mongoose.Schema({
    id: Number,
    userId: Number,
    name: String,
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

module.exports = TagSchema;