var Locale = require('../models/locales');

exports.addNewLocale = function(locale){
	var newLocale = new Locale({
		localeIdentifier: locale.localeIdentifier,
		localeName: locale.localeName,
		localeContent: locale.localeContent
	});
	newLocale.save();
	return newLocale;
};

exports.updateLocale= function(locale){
	var newLocale = new Locale({
		localeIdentifier: locale.localeIdentifier,
		localeName: locale.localeName,
		localeContent: locale.localeContent
	});
	newLocale.save();
	return newLocale;
};

exports.findAll = function(){
	return Locale.find({}).exec();
};

exports.findById = function(id, next){

};