var User = require('../models/user');

exports.addUser = function(user, next){
	var newUser = new User({
		username: user.battlenet.battletag,
		battlenet: {
			accessToken: user.accessToken,
			id: user.battlenet.id,
			battletag: user.battlenet.battletag
		}
	});

	newUser.save(function(err){
		if(err){
			return next(err);
		}
		next(null);
	});
};

exports.findById = function(id, next){
	console.log(id);
	User.findOne({'battlenet.id' : id}, function(err, user){
		console.log(user, id);
		if(err){
			return next(err);
		}
		next(null, user);
	});
};

exports.update = function(condition, values, callback){
	User.update(condition, values, callback);
}