var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	fname: String,
	lname: String,
	username: String,
	password: String,
	salt: String
});

mongoose.model('User', UserSchema);