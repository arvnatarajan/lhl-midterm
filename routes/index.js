'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../lib/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs');
});

/* GET profile page */
router.get('/profile', auth.isLoggedIn, function(req, res) {
  // render profile page, get user info from session
  res.render('profile.ejs', { user : req.user });
});

module.exports = router;
