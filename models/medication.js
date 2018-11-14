var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var UserSchema = new mongoose.Schema({
	date: {
		type: Date
	},
	type: {
		type: String
	},
	nameofmedication:{
		type: String
	},
	instructions:{
		type: String
	},
	dosequantity:{
		type: String
	},
	ratequantity:{
		type: String
	},
	nameofprescriber:{
		type: String
	},
});

var Medication = mongoose.model('Medication', UserSchema);
module.exports = {Medication};