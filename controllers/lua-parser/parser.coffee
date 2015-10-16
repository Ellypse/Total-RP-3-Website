luaparse = require 'luaparse'
events = new (require('events').EventEmitter)

parser =
	parse: luaparse.parse
	parseLocale: (localeData) ->

		luaObject = parser.parse localeData

		localeBody = luaObject.body[0].init[0].fields
		localeIdentifier = localeBody[0].value.value
		localeName = localeBody[1].value.value
		localeFields = localeBody[2].value.fields
		localeContent = []

		if localeFields.length > 0
			localeBody[2].value.fields.forEach (loc) ->
				localeContent.push
					key: loc.key.name
					value: loc.value.value

			return {
				localeIdentifier: localeIdentifier
				localeName: localeName
				localeContent: localeContent
			}

	extractFromTable: (value) ->
		thisValue = value.value.value or {}

		if value.value.type is "TableConstructorExpression" or value.value.type is "TableValue"
			value.value.fields.forEach (fields) ->
				fieldValue = extractFromTable fields
				if fieldValue.key
					thisValue[fieldValue.key] = fieldValue.value
				else
					thisValue[Object.keys(thisValue).length] = fieldValue

		if value.key
			key: value.key.value
			value: thisValue
		else
			thisValue;

	parsedLuaToJSON: (luaObject) ->
		if luaObject.body
			luaObject.body.forEach (variable) ->
				if variable.type is "AssignmentStatement"
					variable.init.forEach (variableContent) ->
						if variableContent.type is "TableConstructorExpression"
							variableContent.fields.forEach (tableField) ->
								fieldKey = tableField.key.value;
								fieldValue = tableField.value;
								if fieldValue.type isnt "TableConstructorExpression"
									myVariable[fieldKey] = fieldValue.value
								else
									tableFieldValue = extractFromTable tableField
									myVariable[fieldKey] = tableFieldValue.value
					if variable.variables
						myVariables[variable.variables[0].name] = myVariable
					else
						myVariables.push myVariable
###
	userData: (userData) ->
		luaObject = parser.parse userData
		jsonObject = parsedLuaToJSON luaObject

		for i in jsonObject.TRP3_Characters
			if i is "Ellÿpse-KirinTor"
				console.log jsonObject.TRP3_Profiles[jsonObject.TRP3_Characters[i].profileID].player.characteristics;
			console.log "Character found : ", i
			if jsonObject.TRP3_Profiles[jsonObject.TRP3_Characters[i].profileID]
				console.log "Associated profile found : ", jsonObject.TRP3_Profiles[jsonObject.TRP3_Characters[i].profileID].profileName
			else
			console.warn "The profile for this character was not found ! Profile ID : ", jsonObject.TRP3_Characters[i].profileID
		for i in jsonObject.TRP3_Profiles
			console.log("Profile found : ", i
###
module.exports = parser