/**
 * User services
 */
var User = require('../models/user');

exports.addUser = function (user, next){
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
	})
};

exports.findById = function(id, next){
	User.findOne({'battlenet.id': id}).exec(function(err, user){
		if(err) next(err);
		else next(null, user);
	});
};

exports.findAll = function(next){
	User.find().sort({created: -1}).exec(function(err, users){
		if (err) next(err);
		else next(null, users);
	});
};

exports.update = function (condition, values, callback) {
	console.log("Updating", condition, values);
	User.findOneAndUpdate(condition, values, function(err, user){
		console.log(err, user);
		callback(err, user);
	});
};

exports.delete = function (userId, next){
	User.remove({
		'battlenet.id': userId
	}, function (err){
		next(err);
	})
};