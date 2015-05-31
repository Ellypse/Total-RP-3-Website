var localization = angular.module('localization', ['angularUtils.directives.dirPagination', 'ui.bootstrap', 'ngFileUpload']);

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

localization.controller('localizationIndexCtrl', function($scope, Upload){

	$scope.upload_progress = "Drag a locale file here to upload.";
	$scope.locales = locales;

	$scope.$watch('files', function(){
		$scope.upload($scope.files);
	});

	$scope.upload = function(files){
		if(files && files.length){
			for(var i = 0; i < files.length; i++){
				var file = files[i];
				Upload.upload({
					url: '/localization/upload',
					file: file
				}).progress(function(evt){
					var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
					$scope.upload_progress = ('progress: ' + progressPercentage + '% ' + evt.config.file.name);
				}).success(function(data, status, headers, config){
					$scope.upload_progress = ('Locale ' + data.localeIdentifier + ' for language '+data.localeName + ' has been correctly uploaded.');
					$scope.locales.push(data);
					console.log(data);
				});
			}
		}
	};

});