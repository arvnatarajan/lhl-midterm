'use strict';

// load all the things we need
const LocalStrategy = require('passport-local').Strategy;
// load the auth variables
const auth_configs = require('../routes/auth');

const PORT                = process.env.PORT || 8080;
const ENV                 = process.env.ENV || "development";
const knexConfig          = require('../knexfile');
const knex                = require('knex')(knexConfig[ENV]);
const bcrypt              = require('bcrypt-nodejs');

module.exports = function(passport) {

  // Functions to setup passport session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    knex('users')
    .select('*')
    .where('id', id)
    .then((user) => {
      done(null, user[0]);
    })
    .catch((err) => {
      done(err);
    });
  });

  // email/pass signup strategy

  const localSignupStrat = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, username, password, done) {
    knex('users')
    .select('*')
    .where('username', username)
    .then((result) => {
      // If user does not exist, add user
      if (!result || !result[0]) {
        knex('users')
        .returning('id')
        .insert({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          picture: req.body.picture
        })
        .then((result) => {
          console.log(result);
          return done(null, {id: result[0]})
        })
        .catch((err) => {
          return done(err);
        });
      }
      // Else user exist, so return message
      else {
        return done(null, false, {message: 'user already exists'});
      }
    });
  });


  const generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }

  // checking if password is valid
  const validatePassword = (password) => {
    return bcrypt.compareSync(password, this.local.password);
  }


  /**
  description: email/pass login strategy
  */
  const localLoginStrat = new LocalStrategy(function(username, password, done) {
    knex('users')
    .select('id')
    .where('username', username)
    .then((result) => {
      console.log(result);
      if (!result || !result[0]) {
        return done(null, false, {message: 'no user exists'});
      }

      if (result[0].id) {
        return done (null, result[0]);
      }
      return done('unexpected outcome');

      // // in the case of passwords not matching
      // if (!result[0].validPassword(password)){
      //   return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      // }
    });
  });

  passport.use('local-signup', localSignupStrat);
  passport.use('local-login', localLoginStrat);

};
