'use strict';

let User = require('../models/user.model.js'),
  config = require('../config'),
  passport = require('passport'),
  jwt = require('jsonwebtoken'),
  _ = require('lodash');

exports.login = function(req, res, next){
  passport.authenticate('local-login', function(err, user, info){
    if (err || !user) {
      res.status(400).json(info);
    } else {
      req.logIn(user, {session: false}, function(err){
        if (err) {
          res.status(400).json(err);
        } else {
          let payload = {
            '_id' : user.id,
            username: user.username,
            isAdmin: user.isAdmin
          };
          // var token = jwt.sign(payload, config.jwtSecretKey, { expiresIn:  60*60*5 });
          var token = jwt.sign(payload, config.jwtSecretKey);
          res.status(200).json({token: token, user: user});
        }
      });
    }
  })(req, res, next);
};

exports.signup = function(req, res, next){
  passport.authenticate('local-signup', function(err, user, info){
    if (err || !user) {
      res.status(400).json(info);
    } else {
      req.logIn(user, {session: false}, function(err){
        if (err) {
          res.status(400).json(err);
        } else {
          let payload = {
            '_id' : user.id,
            username: user.username
          };
          // var token = jwt.sign(payload, config.jwtSecretKey, { expiresIn:  60*60*5 });
          var token = jwt.sign(payload, config.jwtSecretKey);
          res.status(200).json({token: token, user: user, message: 'Signup successfull.'});
        }
      });
    }
  })(req, res, next);
};

exports.profile = function(req, res){
  User.findOne({'username': req.user.username}).exec(function(err, userDoc){
    if (err || !userDoc) {
      return res.status(400).json({message: 'Error finding user.'});
    } else {
      var userDocJson = userDoc.toJSON();
      var data = _.omit(userDocJson, 'password');
      res.status(200).json({ data: data, message: 'success'});
    }
  });
};
