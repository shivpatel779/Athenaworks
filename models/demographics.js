var mongoose = require('mongoose');
var _ = require('lodash');

mongoose.Promise = global.Promise;
var Demographics = new mongoose.Schema({
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	gender:{
		type: String
	},
	martialstatus:{
		type: String
	},
	religiousaffiliation:{
		type: String
	},
	ethnicity:{
		type: String
	},
	languagespoken:{
		type: String
	},
	address:{
		type: String
	},
	telephone:{
		type: Number
	},
	birthday:{
		type: Date
	}
});

Demographics.statics.create = function (req, res) {
  var body = _.pick(req.body, ['firstname', 'lastname', 'gender', 'martialstatus', 'religiousaffiliation', 'ethnicity', 'languagespoken', 'address', 'telephone', 'birthday']);
  var demographics = new Demographics(body); 

 demographics.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
};

Demographics.statics.index = function (req, res) {
 Demographics.find({}, function(err, data){
   if(err){ 
     res.json(err);
    }else{ 
    res.json(data);
   }
 });
};

Demographics.statics.update = function (req, res) {
  Demographics.findOneAndUpdate({_id: req.params.id}, {$set: req.body}).then((demographics) => {
    if (!demographics) {
      return res.status(404).send();
    }
    res.send({demographics});
  }).catch((e) => {
    res.status(400).send();
  })
};

Demographics.statics.delete = function (req, res) {
  Demographics.findOneAndRemove({_id: req.params.id}).then((demographics) => {
    if (!demographics) {
      return res.status(404).send();
    }
    res.send({demographics});
  }).catch((e) => {
    res.status(400).send();
  });
};

var Demographics = mongoose.model('Demographics', Demographics);
module.exports = {Demographics};