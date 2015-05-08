var localization = angular.module('localization', ['angularUtils.directives.dirPagination']);

localization.controller('localizationDetailsCtrl', function ($scope, $http) {
	console.log(localeData);
	$scope.locale = localeData;

	$scope.clearSearch = function(){
		$scope.query = "";
	};

	$scope.submit = function(locale, value){
		console.log(locale, value);

		$http.post('/localization/' + locale, {value:value}).
			success(function(data, status, headers, config) {
				// this callback will be called asynchronously
				// when the response is available
			}).
			error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
	}
});