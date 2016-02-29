'use strict';

let clientScripts = require('../config/scripts.js');
let Url = require('../models/url.model.js');
let _ = require('lodash');
let chance = require('chance').Chance();


exports.retriveUrls = function(req, res){
	Url.find({}).exec(function(err, docs){
		if (err || !docs){
			return res.status(400).send({error: err, message:'failed to load urls.'});
		} else {
			console.log("URLS DOCS \n", docs);
			return res.status(200).send({data: docs, message: 'Success'});
		}
	});
};

exports.saveUrl = function(req, res){
	var b = req.body;
	setTimeout(function(){
		var url = new Url();
		url.url = b.url;
		url.title = b.title;
		url.favIconUrl = b.favIconUrl;
		url.save(function(err, doc){
			if (err || !doc){
				return res.status(400).send({error: err, message: 'Failed to save url.'});
			} else {
				console.log("URL DOC \n", doc);
				res.status(200).send({'data':doc, message: 'successful'});
			}
		});
	},8000);
};
