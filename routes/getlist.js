"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, id) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("lists")
      /*.where('user_id', id)*/
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
