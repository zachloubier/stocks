app.controller('AuthController', ['$scope', '$location', 'auth', function($scope, $location, auth) {
	$scope.user = {};

	$scope.register = function() {
		auth.register($scope.user).error(function(error) {
			$scope.error = error;
		}).then(function() {
			$location.path('/');
		})
	};

	$scope.login = function() {
		auth.login($scope.user).error(function(error) {
			$scope.error = error;
		}).then(function() {
			$location.path('/');
		});
	}
}]);