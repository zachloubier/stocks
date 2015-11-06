app.factory('auth', ['$http', '$window', function($http, $window) {
	var auth = {};

	auth.saveToken = function(token) {
		$window.localStorage['stocks-token'] = token;
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

			return { _id: payload._id, username: payload.username };
		}
	};

	auth.register = function(user) {
		return $http.post('http://localhost:3000/register', user).success(function(data) {
			auth.saveToken(data.token);
		});
	};

	auth.login = function(user) {
		return $http.post('http://localhost:3000/login', user).success(function(data) {
			auth.saveToken(data.token);
		});
	};

	auth.logout = function() {
		$window.localStorage.removeItem('stocks-token');
	};

	return auth;
}]);