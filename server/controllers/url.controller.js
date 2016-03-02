'use strict';

let clientScripts = require('../config/scripts.js');
let config = require('../config');
let User = require('../models/user.model.js');
let Url = require('../models/url.model.js');
let Topic = require('../models/topic.model.js');
let Tag = require('../models/tag.model.js');
let _ = require('lodash');
let async = require('async');
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
	var topic = "";
	var tags = [];
	var tagsForClient = [];
	var topicForClient = {};
	async.waterfall([
		// 1 TOPIC
		function(done){ // {new: true/false, topic: string, topicId: id}
			// 1a - if topic is new then create and return id.
			if (_.isObject(b.topic) && b.topic.new) {
				Topic.findOne({ name: b.topic.topic }).exec(function(err, topicDoc){
					if(err) {
						done({ message: 'Failed to find topic of this name.', error: err});
					} else if (topicDoc){
						topic = topicDoc._id;
						done();
					} else {
						Topic.create({user: config.userId ,name: b.topic.topic}, function(err, topicDoc){
							if (err || !topicDoc){
								done({ message: 'Failed to create topic.', error: err});
							} else {
								// then set topic for saving into the db.
								topic = topicDoc._id;
								topicForClient = { topicId: topicDoc._id , topicName: topicDoc.name };
								done();
							}
						});
					}
				});
			} else { // 1b if not new then simply set the passed value
				topic = ( b.topic && !b.topic.new) ? b.topic.topicId : undefined;
				done();
			}
		},
		// 2 TAG
		function(done){ // { old: [], new: []}
			// 2a - if there are new tags then save them in users tags field
			if(_.isObject(b.tags) && b.tags.new){
				User.findByIdAndUpdate(config.userId).exec(function(err, userDoc){
					if(err || !userDoc){
						done({ message: 'Failed to get user.', error: err});
					} else {
						userDoc.tags.addToSet(b.tags.new);
						console.log('userDoc ', userDoc);
						userDoc.save(function(err, userDoc){
							if(err || !userDoc){
								done({ message: 'Failed to save tags.', error: err});
							} else {
								// set tags
								tags = b.tags.old.concat(b.tags.new);
								tagsForClient = b.tags.new;
								done();
							}
						});
					}
				});
			// 2b - set tags if not new.
			} else {
				tags = (b.tags) ? b.tags.old : undefined;
				done();
			}
		},
		// 3 SAVE
		function(done){
			// Finally perform save operation.
			var url = new Url();
			url.user = config.userId;
			url.url = b.url;
			url.title = b.title;
			url.topic = topic;
			url.note = b.note;
			url.flag = b.flag;
			url.tags = tags;
			url.favIconUrl = b.favIconUrl;
			url.save(function(err, doc){
				if (err || !doc){
					if(err.code === 11000){
						done({error: err, message: 'Url already exists.'});
					}
					done({error: err, message: 'Failed to save url.'});
				} else {
					console.log("URL DOC \n", doc);
					done(null, {
						'data':doc,
						new: {
							tags: (_.isEmpty(tagsForClient)) ? undefined : tagsForClient,
							topic: (_.isEmpty(topicForClient)) ? undefined : topicForClient
						},
						message: 'Save operation successful'
					});
				}
			});
		}
	], function(err, result){
		if(err) {
			console.error('Error: ', err.error);
			res.status(400).jsonp({ message: err.message, error: err.error});
		} else {
			console.log("Successfully saved url to db.");
			res.status(200).jsonp(result);
		}
	});
};
