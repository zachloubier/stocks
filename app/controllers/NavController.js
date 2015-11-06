app.controller('NavController', ['$scope', '$location', 'auth', function($scope, $location, auth) {
	$scope.isLoggedIn = auth.isLoggedIn;
	// console.log(auth.isLoggedIn());
	$scope.currentUser = auth.currentUser;
	$scope.logOut = function() {
		auth.logout();
		$location.path('/login');
	};
}])