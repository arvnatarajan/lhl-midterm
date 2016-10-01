"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, id) => {
  router.post("/", (req, res) => {
    knex
      ('lists')
      .insert({
        name:req.body.title,
        description:req.body.description,
        user_id:id
      })
      .then((results) => {
        res.json(results);
    })
      .catch((error)=>{
        console.log(error);
      })
  });
  return router;
}
