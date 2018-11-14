var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var UserSchema = new mongoose.Schema({
	nameofprovider: {
		type: String
	},
	address: {
		type: String
	},
	telephone:{
		type: Number
	}
});

var Provider = mongoose.model('Provider', UserSchema);
module.exports = {Provider};