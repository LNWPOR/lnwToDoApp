// users model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');


var Users = new Schema({
  username: String,
  password: String
});

Users.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', Users);