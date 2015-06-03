angular.module("register", ['mgo-angular-wizard'])
	.controller("registerCtrl", function($scope, $http, $location, $window, WizardHandler){

		$scope.battletag = battletag;
		$scope.characters = [];
		$scope.user = {};

		$scope.goToCustomUsername = function(){
			WizardHandler.wizard().goTo("username");
		};

		// Skip the username setup
		$scope.goToEmail = function(){
			// Set the username to the battletag of the user
			$scope.user.username = battletag;
			// Go to the email setting step
			WizardHandler.wizard().goTo("email");
		};

		// Submit the data to the server
		$scope.submit= function(){
			$http.post("register", $scope.user)
				.success(function(){
					// Once the server has validated the request, redirect the user to the given destination
					$window.location.href = destination;
				});
		};

		// Set the character name to the one provided by the button and go to the email setting step
		$scope.pickCharacterName = function(characterName){
			$scope.user.username = characterName;
			WizardHandler.wizard().goTo("email");
		};

		// On page load, request the list of characters for the current user to the server
		$http.get("/character").success(function(data){
			// Set the scope characters to the result of the request
			$scope.characters = data.characters;
		});
	});