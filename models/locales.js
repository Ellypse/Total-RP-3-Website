var mongoose = appReq('/database.js');

var Locale = mongoose.model('Locale', {
	localeIdentifier: String,
	localeName: String,
	localeContent: [{
		key: String,
		value: String,
		updated: {type: Date, default: Date.now},
		valueEN: String,
		shouldBeUpdated: {type: Boolean, default: true}
	}]
});

module.exports = Locale;