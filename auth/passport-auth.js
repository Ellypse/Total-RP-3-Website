var bnetConfig = require('./battlenet-config'),
	passport = require('passport'),
	BnetStrategy = require('passport-bnet').Strategy;

var User = require('../services/user-service');

passport.use(new BnetStrategy(bnetConfig, function(accessToken, refreshToken, profile, done) {
	console.log(refreshToken);
	return done(null, {accessToken : accessToken, battlenet : profile});
}));

passport.serializeUser(function(user, done) {
	done(null, user.battlenet.id);
});

passport.deserializeUser(function(userId, done) {
	User.findById(userId, function(err, user){
		done(null, user);
	});
});

passport.isAuthenticated = function(req, res, next) {
	if (req.user)
		return next();
	res.redirect('/user/login');
};

module.exports = passport;