"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.post("/", (req, res) => {
    knex
      ('favourites')
      .insert({
        list_id:req.body,
        user_id:req.body.title
      })
      .then((results) => {
        res.json(results);
        console.log(req.body)
    })
      .catch((error)=>{
        console.log(error);
      })
  });
  return router;
}
