var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var UserSchema = new mongoose.Schema({
	role: {
		type: String
	},
	firstname: {
		type: String
	},
	lastname:{
		type: String
	},
	address:{
		type: String
	},
	telephone:{
		type: Number
	},
});

var Guardian = mongoose.model('Guardian', UserSchema);
module.exports = {Guardian};