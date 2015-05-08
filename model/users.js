var mongoose = require('../database.js');

var Locale = mongoose.model('Users',{
	username : String,
	password : String,
	email : String,
	isAdministrator : { type: Boolean, default: false }
});

module.exports = Locale;