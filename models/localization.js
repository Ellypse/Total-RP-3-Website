var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var localizationSchema = new Schema({
	addOn: String,
	keys: [
		{
			key: String,
			values: [
				{
					language: String,
					value: String,
					updatedBy: {
						type: Schema.Types.ObjectId,
						ref: "User"
					},
					updatedOn: {
						type: Date,
						"default": Date.now
					},
					needsUpdate: {
						type: Boolean,
						"default": true
					},
					needsReview: {
						type: Boolean,
						"default": true
					},
					valueInReview: String
				}
			]
		}
	]
});

var Localization = mongoose.model('Localization', localizationSchema);

module.exports = Localization;