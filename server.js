"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const pg          = require('pg');
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

const user      = require('./models/user');
const bcrypt   = require('bcrypt-nodejs');


// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const listsRoutes = require("./routes/getlist");
const pointsRoutes = require("./routes/getpoints");
const createPointsRoutes = require("./routes/postpoint");

// AUTH =========================================================
const passport      = require('passport');
const flash         = require('connect-flash');
const cookieParser  = require('cookie-parser');
const session       = require('express-session');

app.use(cookieParser()); // read cookies (needed for auth)

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/auth.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./lib/passport')(passport);
// END AUTH =====================================================

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));


const test_id = 2;


// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/lists", listsRoutes(knex, test_id));
app.use("/api/points", pointsRoutes(knex));
app.use("/api/createpoints", createPointsRoutes(knex));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


// // Home page
// app.get("/", (req, res) => {
//   res.render("index");
// });
//
// //Login page
// app.get("/login", (req, res) => {
//   res.render("login");
// });
//
// app.get("/signup", (req, res) => {
//   res.render("profile");
// });

// let newUserObj = {
//   first_name: req.body.first_name,
//   last_name: req.body.last_name,
//   username: req.body.username,
//   password: user.generateHash(req.body.password),
//   email: req.body.email,
//   picture: req.body.picture
// }

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
