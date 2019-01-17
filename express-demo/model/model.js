var mongoose = require("mongoose");
var Schemas = require("./schemas.js");

//通过model编译模式为模型
var UserSchema = Schemas.UserSchema;
var CommentSchema = Schemas.CommentSchema;

var User = mongoose.model("user", UserSchema);
var Comment = mongoose.model("comment", CommentSchema);

exports.User = User;
exports.Comment = Comment;

// UserSchema.static = {
//     fetch: function(cb){
//         return this
//                 .find({})
//                 .sort("meta.updateAt") //按更新时间排序
//     }
// }

// UserSchema.static('fetch', function(cb){
//     return this
//         .find({}, cb)
//         .sort("meta.updateAt") //按更新时间排序
// })

// module.exports = {
//     User: User,
//     Comment: Comment,
// }

exports.User = User;
exports.Comment = Comment;