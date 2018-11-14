var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var UserSchema = new mongoose.Schema({
	date: {
		type: Date
	},
	immunizationname: {
		type: String
	},
	type:{
		type: String
	},
	dosequantity:{
		type: String
	},
	education:{
		type: String
	}
});

var Immunizations = mongoose.model('Immunizations', UserSchema);
module.exports = {Immunizations};