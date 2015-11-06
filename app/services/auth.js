app.factory('auth', ['$http', '$window', function($http, $window) {
	var auth = {};

	auth.saveToken = function(token) {
		console.log('save token factory');
		$window.localStorage['stocks-token'] = token;
		console.log($window.localStorage);
	};

	auth.getToken = function() {
		return $window.localStorage['stocks-token'];
	};

	auth.isLoggedIn = function() {
		var token = auth.getToken();

		if (token) {
			var payload = JSON.parse($window.atob(token.split('.')[1]));

			return payload.exp > Date.now() / 1000;
		} else {
			return false;
		}
	};

	auth.currentUser = function() {
		if (auth.isLoggedIn()) {
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));

			return payload.username;
		}
	};

	auth.register = function(user) {
		return $http.post('http://localhost:3000/register', user).success(function(data) {
			auth.saveToken(data.token);
		});
	};

	auth.login = function(user) {
		console.log('login service');
		console.log(user);
		return $http.post('http://localhost:3000/login', user).success(function(data) {
			auth.saveToken(data.token);
		});
	};

	auth.logout = function() {
		console.log('logout factory');
		$window.localStorage.removeItem('stocks-token');
	};

	return auth;
}]);