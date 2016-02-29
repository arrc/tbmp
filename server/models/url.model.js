'use strict';
var mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  crypto = require('crypto');

let UrlSchema =  mongoose.Schema({
  url: String,
  title: String,
  favIconUrl: String
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
