'use strict';

let clientScripts = require('../config/scripts.js');
let User = require('../models/user.model.js');
let _ = require('lodash');
let chance = require('chance').Chance();

exports.index = function(req, res, next) {
	res.render('index', {clientScripts : clientScripts});
};
