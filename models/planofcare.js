var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var UserSchema = new mongoose.Schema({
	plannedactivityname: {
		type: String
	},
	planneddate: {
		type: Date
	},
	instructions:{
		type: String
	}
});

var PlanofCare = mongoose.model('PlanofCare', UserSchema);
module.exports = {PlanofCare};