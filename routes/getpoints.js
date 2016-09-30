"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get('/', (req, res) => {
    knex.select('list_id', 'lat', 'lng')
    .from('points')
    .then((results) => {
      res.json(results);
    });
  });
  return router;
}
