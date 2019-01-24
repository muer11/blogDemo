var mongoose = require("mongoose");
var CommentSchema = require("../schemas/commentSchema");

var Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;