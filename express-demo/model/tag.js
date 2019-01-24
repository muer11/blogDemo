var mongoose = require("mongoose");
var TagSchema = require("../schemas/tagSchema");

var Tag = mongoose.model('tag', TagSchema);

module.exports = Tag;