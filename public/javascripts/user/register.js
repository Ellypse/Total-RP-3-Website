angular.module("register", ['mgo-angular-wizard'])
	.controller("registerCtrl", function($scope, $http, $location, $window, WizardHandler){
		$scope.battletag = battletag;

		$scope.user = {};

		$scope.finished = function() {
			alert("Wizard finished :)");
		}

		$scope.logStep = function() {
			console.log("Step continued");
		}

		$scope.goBack = function() {
			WizardHandler.wizard().goTo(0);
		}

		$scope.goToCustomUsername = function(){
			WizardHandler.wizard().goTo("username");
		}

		$scope.goToEmail = function(){
			$scope.user.username = battletag;
			WizardHandler.wizard().goTo("email");
		}

		$scope.submit= function(){
			console.log($scope.user);
			$http.post("register", $scope.user)
				.success(function(){
					$window.location.href = "/wiki"
				});
		}

		$scope.pickCharacterName = function(characterName){
			$scope.user.username = characterName;
		}

		$http.get("/character").success(function(data){
			$scope.characters = data.characters;
		})
	});