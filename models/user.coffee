mongoose = appReq '/database.js'

User = mongoose.model 'User',
	username: String
	rights: [String]
	email: String
	battlenet:
		accessToken: String
		id: Number
		battletag: String
	created:
		type: Date
		default: Date.now

module.exports = User;