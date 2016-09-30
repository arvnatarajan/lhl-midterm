'use strict';

// load all the things we need
const LocalStrategy = require('passport-local').Strategy;
// load up the user model
const User = require('../models/user');
// load the auth variables
const auth_configs = require('../routes/auth');

module.exports = function(passport) {
		/**
			description: Functions to setup passport session
		*/
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


		/**
			description: email/pass login strategy
		*/
    const localLoginStrat = new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    }, function(req, email, password, done) {
        if (email){
          email = email.toLowerCase();
        }

        // asynchronous
        process.nextTick(function() {
            User.findOne({'local.email': email}, function(err, user) {
                if (err){ return done(err); }

                // in the case of no user found
                if (!user){
                  return done(null, false, req.flash('loginMessage', 'No user found.'));
                }

                // in the case of passwords not matching
                if (!user.validPassword(password)){
                  return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                }

                return done(null, user);
            });
        });

    });



		/**
			@description: email/pass signup strategy
		*/
    const localSignupStrat = new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    }, function(req, email, password, done) {
        if (email){
          email = email.toLowerCase();
        }
        // asynchronous
        process.nextTick(function() {
            console.log(req);
            // if the user is not already logged in:
            if (!req.username) {

                User.findOne({ 'local.email' :  email }, function(err, user) {
                    if (err){ return done(err); }

                    // check if this email is already taken by someone else
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    }

                    // create the user
                    let newUser = new User();
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function(err) {
                        if (err){ return done(err); }
                        return done(null, newUser);
                    });
                });
            }

            return done(null, req.user);
        });

    });

        passport.use('local-signup', localSignupStrat);
        passport.use('local-login', localLoginStrat);

};
