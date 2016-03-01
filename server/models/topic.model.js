'use strict';
var mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  crypto = require('crypto');

let topicSchema =  mongoose.Schema({
  user: {type: String, ref: 'User'},
  name: {
    type: String,
		required: true, lowercase: true, trim: true,
		unique : true,
		index: {unique: true}
  },
  created: Date
});

topicSchema.options.toJSON = {
  transform: function(doc, ret, options){
    ret.id = ret._id;
    return ret;
  },
  virtuals : true
};

module.exports = mongoose.model('Topic', topicSchema);
