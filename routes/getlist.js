"use strict";

const express = require('express');
const router  = express.Router();

const isLoggedIn = (req, res, next) => {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()){
    return next();
  }
  // if they aren't redirect them to the home page
  res.redirect('/login');
}

module.exports = (knex) => {
  router.get('/', isLoggedIn, (req, res) => {
    console.log(req.user[0]);
    knex('users')
    .join('lists', 'users.id', '=', 'lists.user_id')
    .select('*')
    .where('users.id', req.user[0].id)
    .then((results) => {
      // console.log(results);
      res.json(results);
    });
  });
  return router;
}
