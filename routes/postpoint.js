"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.post("/", (req, res) => {
    knex
      ('points')
      .insert({
        lat:req.body.lat,
        lng:req.body.lng,
        name:req.body.title,
        list_id:req.body.listid,
        picture:req.body.picture
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
