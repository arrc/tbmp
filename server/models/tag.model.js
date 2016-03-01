'use strict';
var mongoose = require('mongoose');

let tagSchema =  mongoose.Schema({
  user: {type: String, ref: 'User'},
  name: String
});

module.exports = mongoose.model('Tag', tagSchema);
