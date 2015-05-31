angular.module("register", ['mgo-angular-wizard'])
	.controller("registerCtrl", function($scope, $http, $location, $window, WizardHandler){

		$scope.battletag = battletag;
		$scope.characters = [];
		$scope.user = {};

		$scope.finished = function() {
			alert("Wizard finished :)");
		};

		$scope.logStep = function() {
			console.log("Step continued");
		};

		$scope.goBack = function() {
			WizardHandler.wizard().goTo(0);
		};

		$scope.goToCustomUsername = function(){
			WizardHandler.wizard().goTo("username");
		};

		$scope.goToEmail = function(){
			$scope.user.username = battletag;
			WizardHandler.wizard().goTo("email");
		};

		$scope.submit= function(){
			$http.post("register", $scope.user)
				.success(function(){
					$window.location.href = destination;
				});
		};

		$scope.pickCharacterName = function(characterName){
			$scope.user.username = characterName;
			WizardHandler.wizard().goTo("email");
		};

		$http.get("/character").success(function(data){
			$scope.characters = data.characters;
			console.log($scope.characters);
		})

		$scope.loaded = false;
	});