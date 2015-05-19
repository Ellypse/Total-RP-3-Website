/**
 * Node modules importation
 */
var express = require('express'),
	router = express.Router(),
	passport = require('passport');

/**
 * Controllers
 */
var User = require('../../services/user-service');

router.get('/register', function(req,res){
	res.render("user/register", {battletag : req.user.battlenet.battletag});
});

router.post('/register', function(req, res){
	User.update({'battlenet.id': req.user.battlenet.id}, { username: req.body.username, email: req.body.email}, function(){
		res.json({status:'ok'});
	});
});

router.get('/login', function(req,res){
	res.render("user/login");
});

router.get('/auth/bnet',
	passport.authenticate('bnet'));

router.get('/auth/bnet/callback',
	passport.authenticate('bnet', { failureRedirect: '/' }),
	function(req, res){
		User.findById(req.user.battlenet.id, function(err, user){
			if(err){
				return console.warn(err);
			}
			console.log(user);
			if(!user){
				User.addUser(req.user, function(){
					res.redirect('/user/register');
				})
			}
			else{
				res.redirect('/wiki');
			}

		});
	});

module.exports = router;
