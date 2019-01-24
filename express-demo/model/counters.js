var mongoose = require("mongoose");
var CountersSchema = require("../schemas/countersSchema");

var Counters = mongoose.model('counters', CountersSchema);

module.exports = Counters;