var luaparse = require('luaparse');

var parser = {
	parse: luaparse.parse,
	parseLocale: function (localeData) {
		var localeBody, localeContent, localeFields, localeIdentifier, localeName, luaObject;
		luaObject = parser.parse(localeData);
		localeBody = luaObject.body[0].init[0].fields;
		localeIdentifier = localeBody[0].value.value;
		localeName = localeBody[1].value.value;
		localeFields = localeBody[2].value.fields;
		localeContent = [];
		if (localeFields.length > 0) {
			localeBody[2].value.fields.forEach(function (loc) {
				localeContent.push({
					key: loc.key.name,
					value: loc.value.value
				});
			});
			return {
				localeIdentifier: localeIdentifier,
				localeName: localeName,
				localeContent: localeContent
			};
		}
	},
	/*	extractFromTable: function (value) {
	 var thisValue;
	 thisValue = value.value.value || {};
	 if (value.value.type === "TableConstructorExpression" || value.value.type === "TableValue") {
	 value.value.fields.forEach(function (fields) {
	 var fieldValue;
	 fieldValue = extractFromTable(fields);
	 if (fieldValue.key) {
	 return thisValue[fieldValue.key] = fieldValue.value;
	 }
	 else {
	 return thisValue[Object.keys(thisValue).length] = fieldValue;
	 }
	 });
	 }
	 if (value.key) {
	 return {
	 key: value.key.value,
	 value: thisValue
	 };
	 }
	 else {
	 return thisValue;
	 }
	 },
	 parsedLuaToJSON: function (luaObject) {
	 if (luaObject.body) {
	 return luaObject.body.forEach(function (variable) {
	 if (variable.type === "AssignmentStatement") {
	 variable.init.forEach(function (variableContent) {
	 if (variableContent.type === "TableConstructorExpression") {
	 return variableContent.fields.forEach(function (tableField) {
	 var fieldKey, fieldValue, tableFieldValue;
	 fieldKey = tableField.key.value;
	 fieldValue = tableField.value;
	 if (fieldValue.type !== "TableConstructorExpression") {
	 return myVariable[fieldKey] = fieldValue.value;
	 }
	 else {
	 tableFieldValue = extractFromTable(tableField);
	 return myVariable[fieldKey] = tableFieldValue.value;
	 }
	 });
	 }
	 });
	 if (variable.variables) {
	 return myVariables[variable.variables[0].name] = myVariable;
	 }
	 else {
	 return myVariables.push(myVariable);
	 }
	 }
	 });
	 }
	 }*/
};

module.exports = parser;