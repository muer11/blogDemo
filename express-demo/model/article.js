var mongoose = require("mongoose");
var ArticleSchema = require("../schemas/articleSchema");

var Article = mongoose.model('article', ArticleSchema);

module.exports = Article;