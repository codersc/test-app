var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bar = new Schema(
	{
		id: String,
		attendees: Number
	},
	{ versionKey: false }
);

module.exports = mongoose.model('Bar', Bar);