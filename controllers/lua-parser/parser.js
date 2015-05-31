var luaparse = require('luaparse'),
events = new (require('events').EventEmitter);

var parser = {};

parser.parse = luaparse.parse;

parser.parseLocale = function(localeData){
	var luaObject = parser.parse(localeData);

	var localeBody = luaObject.body[0].init[0].fields;
	var localeIdentifier = localeBody[0].value.value;
	var localeName = localeBody[1].value.value;
	var localeFields = localeBody[2].value.fields;
	var localeContent = [];

	if(localeFields.length > 0){
		localeBody[2].value.fields.forEach(function(loc){
			localeContent.push({key: loc.key.name, value: loc.value.value});
		});
	}

	return {
		localeIdentifier: localeIdentifier,
		localeName: localeName,
		localeContent: localeContent
	};
};

function extractFromTable(value){
	var thisValue = value.value.value!=null ? value.value.value : {};
	if(value.value.type == "TableConstructorExpression" || value.value.type =="TableValue"){
		value.value.fields.forEach(function(fields){
			var fieldValue = extractFromTable(fields);
			if(fieldValue.key){
				thisValue[fieldValue.key] = fieldValue.value;
			}
			else{
				thisValue[Object.keys(thisValue).length] = fieldValue;
			}
		});
	}

	if(value.key){
		var myObject = {
			key : value.key.value,
			value : thisValue
		};
	}
	else{
		var myObject = thisValue;
	}
	return myObject;
}

function parsedLuaToJSON(luaObject){
	var myVariables = {};
	if(luaObject.body){
		luaObject.body.forEach(function(variable){
			if(variable.type === "AssignmentStatement"){
				var myVariable = {};
				variable.init.forEach(function(variableContent){
					if(variableContent.type === "TableConstructorExpression"){
						variableContent.fields.forEach(function(tableField){
							var fieldKey = tableField.key.value;
							var fieldValue = tableField.value;
							if(fieldValue.type !== "TableConstructorExpression"){
								myVariable[fieldKey] = fieldValue.value;
							}
							else{
								var tableFieldValue = extractFromTable(tableField);
								myVariable[fieldKey] = tableFieldValue.value;
							}

						});
					}
				});
				if(variable.variables){
					myVariables[variable.variables[0].name] = myVariable;
				}
				else{
					myVariables.push(myVariable);
				}

			}
		});
	}
	return myVariables;
}

parser.userData = function(userData){
	var luaObject = parser.parse(userData);
	var jsonObject = parsedLuaToJSON(luaObject);
	for(var i in jsonObject.TRP3_Characters){
		if(i == "Ellÿpse-KirinTor"){
			console.log(jsonObject.TRP3_Profiles[jsonObject.TRP3_Characters[i].profileID].player.characteristics);
		}
		console.log("Character found : ", i);
		if(jsonObject.TRP3_Profiles[jsonObject.TRP3_Characters[i].profileID]){
			console.log("Associated profile found : ", jsonObject.TRP3_Profiles[jsonObject.TRP3_Characters[i].profileID].profileName);
		}
		else{
			console.warn("The profile for this character was not found ! Profile ID : ", jsonObject.TRP3_Characters[i].profileID )
		}
	}
	for(var i in jsonObject.TRP3_Profiles){
		console.log("Profile found : ", i);
	}

};

module.exports = parser;