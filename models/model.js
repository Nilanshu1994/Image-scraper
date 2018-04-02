var mongoose = require("mongoose");

var searchschema = new mongoose.Schema({
	searchparam: String,
});

module.exports = mongoose.model("data" , searchschema);

