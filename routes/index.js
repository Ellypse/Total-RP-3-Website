var express = require('express');
var router = express.Router();

var UITweaksController = require('../controllers/ui-tweaks-controller');

/* GET home page. */
router.get('/', function (req, res) {
	var randomBackground = UITweaksController.pickOne();
	res.render('index', {background: randomBackground});
});

module.exports = router;
