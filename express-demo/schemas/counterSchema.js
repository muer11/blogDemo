var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//计数表counters
var CounterSchema = new mongoose.Schema({
    _id: String,
    sequence_value: Number
});

module.exports = CounterSchema;