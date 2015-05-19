var mongoose = require('../database.js'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	username: String,
	rights: [String],
	email: String,
	battlenet: {
		accessToken: String,
		id: Number,
		battletag: String
	},
	created: {type:Date, default: Date.now}
});

var User = mongoose.model('User',userSchema);

module.exports = User;