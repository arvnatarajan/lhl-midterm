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
    // .leftJoin('lists', 'users.id', '=', 'lists.user_id')
    .select('*')
    .where('users.id', id)
    .then((user) => {
      done(null, user);
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
          password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null),
          picture: req.body.picture
        })
        .then((result) => {
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

  //email/pass login strategy
  const localLoginStrat = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, username, password, done) {
    // if(username) {
    //   username = username.toLowerCase();
    // }

    knex('users')
    // .leftJoin('lists', 'users.id', '=', 'lists.user_id')
    .select('*')
    .where('username', req.body.username)
    .then((result) => {
      console.log('Logged in user: ', result[0].id);
      if (!result || !result[0]) {
        return done(null, false, {message: 'no user exists'});
      } else {
        if (!bcrypt.compareSync(password, result[0].password)) {
          return done(null, false, {message: 'Invalid password'});
        } else {
          return done (null, {
            username: result[0].username,
            first_name: result[0].first_name,
            last_name: result[0].last_name,
            id: result[0].id,
            email: result[0].email
          });
        }
      }
    })
    .catch((err) => {
      return done(err);
    });
  });

  passport.use('local-signup', localSignupStrat);
  passport.use('local-login', localLoginStrat);

};
