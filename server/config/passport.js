'use strict';
var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
User = require('../models/user.model.js');

module.exports = function(){
  // login
  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true
  },
  function(req, username, password, done){
    process.nextTick(function(){
      User.findOne({ username: username }, function(err, user){
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Unknown user'});
        if (!user.validPassword(password)){
          return done(null, false, {message: 'Incorrect password'});
        }
        return done(null, user);
      });
    });
  }));

  // signup
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true
  },
  function(req, username, password, done){
    process.nextTick(function(){
      User.findOne({ username: username }, function(err, existingUser){
        if (err) return done(err);
        if (existingUser) return done(null, false, { message: 'User already exist' });
        console.log(req.body);
        // create user
        var newUser = new User();
        var b = req.body;
        newUser.username = username;
        newUser.password = b.password;
        newUser.firstName = b.firstName;
        newUser.lastName = b.lastName;
        newUser.email = b.email;
        newUser.gender = b.gender;
        newUser.save(function(err){
          if (err) return done(null, false, { message: err });
          return done(null, newUser);
        });
      });
    });
  }));
};
