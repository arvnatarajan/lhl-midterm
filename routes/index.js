'use strict';

const express = require('express');
const router = express.Router();

const isLoggedIn = (req, res, next) => {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()){
    return next();
  }
  // if they aren't redirect them to the home page
  res.redirect('/login');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs');
});

/* GET profile page */
router.get('/profile', isLoggedIn, function(req, res) {
  // render profile page, get user info from session
  res.render('profile.ejs', {
    id: req.user[0].gitid,
    username: req.user[0].username,
    first_name: req.user[0].first_name,
    last_name: req.user[0].last_name,
    email: req.user[0].email
   });
});

/* GET maps page */
router.get('/map', isLoggedIn, function(req, res) {
  // render profile page, get user info from session
  res.render('map.ejs', { message : req.flash('loginMessage') });
});


module.exports = router;
