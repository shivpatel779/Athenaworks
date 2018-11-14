var bodyparser = require('body-parser');
var express = require('express');
var _ = require('lodash');

var mongoose = require("mongoose");
var {Allergies} = require('./models/allergies');
var {Demographics} = require('./models/demographics');
var {Guardian} = require('./models/guardian');
var {Provider} = require('./models/provider');
var {Immunizations} = require('./models/immunizations');
var {Medication} = require('./models/medication');
var {PlanofCare} = require('./models/planofcare');
var {Encounters} = require('./models/encounters');


mongoose.connect('mongodb://localhost/medical');

var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.post('/demographics', (req, res) => {
	Demographics.create(req, res);
});

app.get('/demographics', (req, res) => {
	Demographics.index(req, res);
});

app.patch('/demographic/:id', (req, res) => {
  Demographics.update(req, res);
});

app.delete('/demographic/:id', (req, res) => {
	Demographics.delete(req, res);
});


app.post('/allergies', (req, res) => {
	Allergies.create(req, res);
});

app.get('/allergies', (req, res) => {
	Allergies.index(req, res);
});

app.patch('/allergy/:id', (req, res) => {
	Allergies.update(req, res);
});

app.delete('/allergy/:id', (req, res) => {
	Allergies.delete(req, res);
});

app.listen(3004);