var user = angular.module('user', []);

user.controller('registerCtrl', function ($scope, $http) {

	$scope.user = {};

	$scope.submit = function(){
		if(!$scope.user.username){
			$scope.error= "Please enter a username for your account.";
			return;
		}
		if(!$scope.user.password){
			$scope.error= "Please enter a password for your account.";
			return;
		}
		if(!$scope.user.email){
			$scope.error = "Please enter your email address.";
			return;
		}
		$scope.error="";

		$http.post("/user/register", $scope.user);
	}
})
	.controller('loginCtrl', function ($scope, $http) {

		$scope.user = {};

		$scope.submit = function(){
			if(!$scope.user.username){
				$scope.error= "Please enter your username.";
				return;
			}
			if(!$scope.user.password){
				$scope.error= "Please enter your password.";
				return;
			}
			$scope.error="";

			$http.post("/user/login", $scope.user)
				.success(function(data){
					console.log(data);
					if(data){
						$scope.error="You are connected (sort of).";
					}
					else{
						$scope.error="Wrong username or password.";
					}
				})
				.error(function(data){
					console.log(data);
				});
		}
	});