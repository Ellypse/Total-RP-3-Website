/**
 * Node modules importation
 */
var appRoot = require('app-root-path'),
	express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	debug = require('debug')('app');

/**
 * Controllers
 */
var User = require(appRoot + '/services/user-service'),
	isAuthenticated = require(appRoot + "/controllers/authentication/passport-auth").isAuthenticated;

router.get('/', isAuthenticated, function(req, res){

});

router.get('/register', isAuthenticated, function(req, res){
	var destination = req.session.destination ? req.session.destination : "/wiki";
	res.render("user/register", {
		battletag: req.user.battlenet.battletag,
		destination: destination
	});
});

router.post('/register', isAuthenticated, function(req, res){
	User.update({'battlenet.id': req.user.battlenet.id}, {
		username: req.body.username,
		email: req.body.email
	}, function(){
		res.json({status: 'ok'});
	});
});

router.get('/login', function(req, res){
	res.render("user/login");
});

router.get('/auth/bnet',
	passport.authenticate('bnet'));

router.get('/auth/bnet/callback',
	passport.authenticate('bnet', {failureRedirect: '/'}),
	function(req, res){
		User.findById(req.user.battlenet.id, function(err, user){
			if(err){
				return console.warn(err);
			}
			if(!user){
				User.addUser(req.user, function(){
					res.redirect('/user/register');
				})
			}
			else{
				if(req.session.destination){
					res.redirect(req.session.destination);
				}
				else{
					res.redirect('/wiki');
				}

			}

		});
	});

module.exports = router;
