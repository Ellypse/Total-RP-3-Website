var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: String,
	isAdmin: {
		type: Boolean,
		"default": false
	},
	email: String,
	battlenet: {
		accessToken: String,
		id: Number,
		battletag: String
	},
	created: {
		type: Date,
		"default": Date.now
	}
});

var User = mongoose.model('User', userSchema);

module.exports = User;