app.controller('HomeController', ['$scope', '$http', 'stocks', 'auth', function($scope, $http, stocks, auth) {
	$scope.stocks = stocks.stocks;
	$scope.isLoggedIn = auth.isLoggedIn;
	// stocks.getStocks().success(function(data) {
	// 	$scope.stocks = data;
	// });

	$scope.addStock = function() {
		if (!$scope.symbol || $scope.symbol === '') {
			return;
		}

		console.log(auth.currentUser());

		var stock = {
			symbol: $scope.symbol,
			price: "12.12",
			open: "23.12",
			close: "45.43",
			users: []
		};

		if ($scope.isLoggedIn()) {
			stock.users.push(auth.currentUser()._id);
		}

		stocks.create(stock).success(function(data) {
			console.log(data);
			$scope.newId = data;
		});

		$scope.symbol = '';
	};
}]);