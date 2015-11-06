app.controller('AuthController', ['$scope', '$location', 'auth', function($scope, $location, auth) {
	$scope.user = {};

	$scope.register = function() {
		// console.log($scope.user);
		console.log('register controller');
		auth.register($scope.user).error(function(error) {
			$scope.error = error;
		}).then(function() {
			$location.path('/');
		})
	};

	$scope.login = function() {
		console.log('login controller');
		auth.login($scope.user).error(function(error) {
			$scope.error = error;
		}).then(function() {
			$location.path('/');
		});
	}
}]);