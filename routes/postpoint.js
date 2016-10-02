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
  router.post("/", isLoggedIn, (req, res) => {
    // console.log(req.body);
    knex('points')
      .insert({
        list_id: req.body.listid,
        /*user_id:req.user[0].id,*/
        lat: req.body.lat,
        lng: req.body.lng,
        name: req.body.title,
        description: req.body.description
      })
      .then((results) => {
        res.json(results);
        console.log(results);
    })
      .catch((error)=>{
        console.log(error);
      })
  });
  return router;
}
