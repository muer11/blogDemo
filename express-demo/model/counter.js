var mongoose = require("mongoose");
var CounterSchema = require("../schemas/counterSchema");

var Counters = mongoose.model('counter', CounterSchema);

module.exports = Counters;