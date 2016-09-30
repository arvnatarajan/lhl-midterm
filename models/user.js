// app/models/user.js
// load the things we need

const bcrypt   = require('bcrypt-nodejs');


// create the model for users and expose it to our app
module.exports = {

  createUser: function (input) {

  },




  // methods ======================
  // generating a hash
  generateHash: function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },

  // checking if password is valid
  validatePassword: function(password) {
    return bcrypt.compareSync(password, this.local.password);
  }
}
