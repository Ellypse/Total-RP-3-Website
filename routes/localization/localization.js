var express = require('express');
var router = express.Router(),
	path = require("path"),
	fs = require('fs'),
	lua = require('luaparse'),
	Locale = require('.././locales');

/* GET home page. */
router.get('/', function (req, res, next) {
	Locale.find({},{value:false},function (err, locales) {
		res.render("localization/index", {locales : locales});
	})

});

router.get("/:id", function(req,res,next){
	var localeId = req.params.id;
	Locale.findOne({id: localeId}, function(err, locale){
		res.render("localization/localizationDetails", {locale:locale});
	});
});

router.get("/create/:id", function(req,res,next){
	var locale = new Locale({ id: req.params.id, locales: [] });
	Locale.findOne({id: 'enUS'}, function(err, localeEN){
		localeEN.locales.forEach(function(valueEN){
			locale.locales.push({
				key : valueEN.key,
				value : '',
				valueEN : valueEN.value,
				updated : Date.now(),
				shouldBeUpdated: true
			});
		});
		locale.save();
	});
	res.end();
});

router.post('/:id', function(req, res, next) {
	var localeId = req.params.id;
	var value = req.body.value;

	console.log(localeId, value);
});

module.exports = router;
