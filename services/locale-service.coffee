Locale = appReq '/models/locales'

exports.addNewLocale = (locale) ->
	newLocale = new Locale
		localeIdentifier: locale.localeIdentifier
		localeName: locale.localeName
		localeContent: locale.localeContent
	newLocale.save()
	return newLocale

exports.updateLocale = (locale) ->
	newLocale = new Locale
		localeIdentifier: locale.localeIdentifier
		localeName: locale.localeName
		localeContent: locale.localeContent
	newLocale.save()
	return newLocale

exports.findAll = () ->
	Locale.find().exec()

exports.findById = (id, next) ->
	id