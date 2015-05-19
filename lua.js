var path = require("path"),
	fs = require('fs'),
	lua = require('luaparse'),
	async = require("async"),
	Locale = require('./models/locales');

fs.readFile("./locale_enUS.lua", 'utf8', function(err, data){

	var localeId = 'enUF';

	var luaData = lua.parse(data);
	var luaTable = luaData.body[0].init[0].fields[2].value.fields;

	async.waterfall([
		function(callback) {
			Locale.find({id : localeId}, {strings:0}, function(error, englishLocale){
				if(englishLocale.length == 0){
					englishLocale = new Locale({id : localeId, string : []});
				}
				callback(null, englishLocale);
			});

		},
		function(englishLocale, callback) {
			luaTable.forEach(function(luaValue){
				var string = {
					key: luaValue.key.name,
					value: luaValue.value.value,
					valueEN: luaValue.value.value,
					update: Date.now(),
					shouldBeUpdated: false
				};
				englishLocale.strings[string.key] = string;
			});
			callback(null, englishLocale);
		}
	], function (err, result) {
		console.log(result);
	});

	/*var localeEnUS = new Locale({id: 'enUS', strings: []});*/

	/*table.forEach(function(locale){
		var string = {
			key: locale.key.name,
			value: locale.value.value,
			valueEN: locale.value.value,
			update: Date.now(),
			shouldBeUpdated: false
		};
		localeEnUS.strings.push(string);
	});*/

	/*localeEnUS.save(function(err){
		if(err){
			console.warn(err);
		} else{
			console.log("Update succes");
		}
	});*/

});
