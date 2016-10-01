"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, id) => {
  router.get('/', (req, res) => {
    knex.select('*')
    .from('favourites')
    // ERIC : WHERE USERID IS EQUAL TO CURRENT USER
    .then((results) => {
      res.json(results);
    });
  });
  return router;
}
