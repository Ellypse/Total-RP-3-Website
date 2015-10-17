angular.module("totalrp", ['angularUtils.directives.dirPagination'])

	.controller("userManagementCtrl", function ($scope, $http) {
		$scope.users = [];

		var fetchUsers = function(){
			$http.get('/user/getAll')
				.success(function (data) {
					$scope.users = data;
				})
				.error(function (error) {
					console.error(error);
				});
		};

		$scope.deleteUser = function (user){
			$http.post('/user/delete',{
				userId: user.battlenet.id
			})
				.success(function(data){
					fetchUsers();
				})
				.error(function(error){
					console.error(error);
				});
		};

		$scope.setUserAdmin = function(user){
			$http.post('/user/update', user);
		};

		fetchUsers();
	});