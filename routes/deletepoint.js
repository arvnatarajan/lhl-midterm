"use strict";

const express = require('express');
const router  = express.Router();

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

module.exports = (knex) => {
  router.delete("/", (req, res) => {
    knex
      ('points')
      .where({
        list_id:req.body.list,
        user_id:req.user[0].id
      })
      .del()
      .then((results) => {
        res.json(results);
    })
      .catch((error)=>{
        console.log(error);
      })
  });
  return router;
}
