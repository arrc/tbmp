'use strict';

let clientScripts = require('../config/scripts.js');
let User = require('../models/user.model.js');
let _ = require('lodash');
let chance = require('chance').Chance();

exports.index = function(req, res, next) {
	res.render('index', {clientScripts : clientScripts});
};

exports.list = function(req, res){
	res.status(200).send({'data':['324','car', 'bike'], message: 'successful'});
};

exports.getUrl = function(req, res){
	var b = req.body;
	setTimeout(function(){
		console.log(b);
		res.status(200).send({'data':b, message: 'successful'});
	},8000);
};

exports.profile = function(req, res){
	User.findOne({ 'username' : 'admin'}).exec(function(err, doc){
		if(err) return console.error(err);
		res.status(200).send({'data': doc, message: 'successful'});
	});
};
