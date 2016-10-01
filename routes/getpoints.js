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
    knex('points')
    .join('lists', 'lists.id', '=', 'points.list_id')
    .join('users', 'users.id', '=', 'lists.user_id')
    .select('list_id', 'lat', 'lng')
    .where('users.id', req.user[0].user_id)
    .then((results) => {
      res.json(results)
    });
  });
  return router;
}
