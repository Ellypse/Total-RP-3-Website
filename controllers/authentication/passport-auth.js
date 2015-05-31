/**
 * Node modules
 */
var passport = require('passport');
var BnetStrategy = require('passport-bnet').Strategy;

/**
 * Config
 */
var bnetConfig = require('./battlenet-config');

/**
 * Services
 */
var User = require('../../services/user-service');

passport.use(new BnetStrategy(bnetConfig, function(accessToken, refreshToken, profile, done) {
	return done(null, {accessToken : accessToken, battlenet : profile});
}));


//noinspection JSUnresolvedFunction
passport.serializeUser(function(user, done) {
	done(null, user.battlenet.id);
});

//noinspection JSUnresolvedFunction
passport.deserializeUser(function(userId, done) {
	User.findById(userId, function(err, user){
		done(null, user);
	});
});

passport.isAuthenticated = function(req, res, next) {
	if (req.user)
		return next();
	req.session.destination = req.originalUrl;
	res.redirect('/user/login');
};

module.exports = passport;