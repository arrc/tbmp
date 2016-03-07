'use strict';

let clientScripts = require('../config/scripts.js');
let config = require('../config');
let User = require('../models/user.model.js');
let Topic = require('../models/topic.model.js');
let Url = require('../models/url.model.js');
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

exports.topics = function(req, res){
	Topic.find({user: req.user._id}).exec(function(err, docs){
		if(err) return console.error(err);
		var data = [];
		docs.forEach(function(i){
			data.push(_.pick(i, ['_id','name']));
		});
		res.status(200).send({'data': data, message: 'successful'});
	});
};

exports.urls = function(req, res){
	Url.find({user: req.user._id}).exec(function(err, docs){
		if(err) return console.error(err);
		var data = _.map(docs, 'url');
		res.status(200).send({'data': data, message: 'successful'});
	});
};
