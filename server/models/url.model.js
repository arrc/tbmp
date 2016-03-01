'use strict';
var mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  crypto = require('crypto');

let UrlSchema =  mongoose.Schema({
  user: {type: String, ref: 'User'},
  url: {
    type: String,
		required: true, lowercase: true, trim: true,
		unique : true,
		index: {unique: true}
  },
  baseUrl: String,
  title: String,
  topic: String,
  favIconUrl: String,
  note: String,
  tags: [String],
  flag: String,
  created: Date
});

UrlSchema.options.toJSON = {
  transform: function(doc, ret, options){
    ret.id = ret._id;
    delete ret.password;
    return ret;
  },
  virtuals : true
};

module.exports = mongoose.model('Url', UrlSchema);
