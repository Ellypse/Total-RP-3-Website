var mongoose = require('../database.js')
	, Schema = mongoose.Schema;

var Locale = Schema('Modifications',{
	user : {type: Schema.ObjectId, ref: 'Users'},
	locale : {type: Schema.ObjectId, ref: 'Locales'},
	string : {type: Schema.ObjectId, ref: 'Strings'}
});

module.exports = Locale;