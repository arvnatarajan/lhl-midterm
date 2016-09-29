"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {
/*    knex
      .insert([{lat:req.body.lat},{lng:req.body.lng},{name:req.body.title},{list_id:req.body.listid},{picture:req.body.picture}])
      .into('points')
      .then((results) => {
        res.json(results);
    });*/
    console.log(req.body);
  });

  return router;
}
