"use strict";

require('dotenv').config();
const PORT                = process.env.PORT || 8080;
const ENV                 = process.env.ENV || "development";
const express             = require('express');
const app                 = express();
const bodyParser          = require('body-parser');
const sass                = require('node-sass-middleware');
const pg                  = require('pg');
const knexConfig          = require('./knexfile');
const knex                = require('knex')(knexConfig[ENV]);
const morgan              = require('morgan');
const knexLogger          = require('knex-logger');
const bookshelf           = require('bookshelf')(knex);
const User                = bookshelf.Model.extend({tableName: 'users'});


// Seperated Routes for each Resource

const usersRoutes         = require("./routes/users");
const listsRoutes         = require("./routes/getlist");
const pointsRoutes        = require("./routes/getpoints");
const createPointsRoutes  = require("./routes/postpoint");
const createListsRoutes   = require("./routes/postlist");
const likesRoutes         = require("./routes/getlikes");
const listlikesRoutes     = require("./routes/getlistlikes");
const newLikeRoutes       = require("./routes/postlike");
const getFavourites       = require("./routes/getFavourites");
const getAllLists         = require("./routes/getAllLists");
const dellike             = require("./routes/dellike");



// AUTH =========================================================
const bcrypt              = require('bcrypt-nodejs');
const passport            = require('passport');
const flash               = require('connect-flash');
const cookieParser        = require('cookie-parser');
const session             = require('express-session');

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// END AUTH =====================================================

app.set('view engine', 'ejs');


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(knexLogger(knex)); // Log knex SQL queries to STDOUT as well
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // read cookies (required for auth)
app.use(express.static("public"));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

const test_id = 2;

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/lists", listsRoutes(knex));
app.use("/api/points", pointsRoutes(knex));

app.use("/api/likes", likesRoutes(knex));
app.use("/api/listlikes", listlikesRoutes(knex));

app.use("/api/createpoints", createPointsRoutes(knex));
app.use("/api/createlists", createListsRoutes(knex));
app.use("/api/postlike", newLikeRoutes(knex));
app.use("/api/getFavourites", getFavourites(knex));
app.use("/api/getAllLists", getAllLists(knex));
app.use("/api/dellike", dellike(knex));


// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


require('./lib/passport')(passport); // loads configured passport with strategies
require('./routes/auth')(app, passport); // loads routes and pass in app and fully configured passport

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
