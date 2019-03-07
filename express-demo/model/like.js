var mongoose = require("mongoose");
var likeSchema = require("../schemas/likeSchema");

var Like = mongoose.model('like', likeSchema);

module.exports = Like;