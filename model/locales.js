var mongoose = require('../database.js')
	, Schema = mongoose.Schema;

var localeSchema = Schema({
	id: String,
	strings : [{
		key : String,
		value : String,
		updated: { type: Date, default: Date.now },
		valueEN : String,
		shouldBeUpdated : Boolean
	}]
});

var Locale = mongoose.model('Locales', localeSchema);

module.exports = Locale;