var mongoose = require('mongoose');
var _ = require('lodash');

mongoose.Promise = global.Promise;
var Allergies = new mongoose.Schema({
	allergyname: {
		type: String
	},
	reaction: {
		type: String
	},
	severity:{
		type: String
	}
});

Allergies.statics.create = function (req, res) {
  var body = _.pick(req.body, ['allergyname', 'reaction', 'severity']);
  var allergies = new Allergies(body); 

	allergies.save().then(() => {
		res.json({message: "created"});
	})
	  
};

Allergies.statics.index = function (req, res) {
  Allergies.find({}, function(err, data){
   if(err){ 
     res.json(err);
    }else{ 
    res.json(data);
   }
 });
};

Allergies.statics.update = function (req, res) {
  Allergies.findOneAndUpdate({_id: req.params.id}, {$set: req.body}).then((allergy) => {
    if (!allergy) {
      return res.status(404).send();
    }
    res.send({allergy});
  }).catch((e) => {
    res.status(400).send();
  })
};

Allergies.statics.delete = function (req, res) {
  Allergies.findOneAndRemove({_id: req.params.id}).then((allergy) => {
    if (!allergy) {
      return res.status(404).send();
    }
    res.send({allergy});
  }).catch((e) => {
    res.status(400).send();
  });
};

var Allergies = mongoose.model('Allergies', Allergies);
module.exports = {Allergies};