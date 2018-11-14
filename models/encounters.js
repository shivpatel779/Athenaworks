var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var UserSchema = new mongoose.Schema({
	encounter: {
		type: String
	},
	provider: {
		type: String
	},
	location:{
		type: String
	},
	date:{
		type: Date
	}
});

var Encounters = mongoose.model('Encounters', UserSchema);
module.exports = {Encounters};