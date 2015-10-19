/**
 * Localization routes
 */

var express = require('express');
var router = express.Router();

var userService = require("../services/user-service");
var authenticationController = require("../controllers/authentication-controller");

var isAuthenticated = authenticationController.isAuthenticated;
var hasAdministratorRights = authenticationController.hasAdministratorRights;

/* GET home page. */
router.get('/', isAuthenticated, function (req, res) {
	res.render('localization/index', {
		user: req.user
	});
});

router.post('/upload', isAuthenticated, hasAdministratorRights, function (req, res) {

});

module.exports = router;
