app.controller('HomeController', ['$scope', '$http', 'stocks', 'auth', 'yahoo', function($scope, $http, stocks, auth, yahoo) {
	$scope.stocks = stocks.stocks;
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.error = false;
	$scope.success = false;

	$scope.addStock = function() {
		if (!$scope.symbol || $scope.symbol === '') {
			return;
		}

		// First check if the stock has already been added to the db
		var getStockFromDb = stocks.get($scope.symbol);

		getStockFromDb.success(function(dbStock) {

			// If there is not a stock already in the db, get it from the Yahoo API
			if (dbStock == null) {
				yahoo.get($scope.symbol).success(function(response) {
					if (response.query.count > 0) {
						var stockData = response.query.results.quote;

						var stock = {
							name: stockData.Name,
							symbol: stockData.Symbol.toUpperCase(),
							price: stockData.Bid,
							open: stockData.Open,
							close: stockData.Close,
							users: []
						};

						if ($scope.isLoggedIn()) {
							stock.users.push(auth.currentUser()._id);
						}

						stocks.create(stock).success(function(data) {
							$scope.newId = data;
						});

						$scope.message = 'Stock "' + $scope.symbol + '" was added!';
						$scope.symbol = '';
						$scope.error = false;
						$scope.success = true;
					}
				});
			} else {
				$scope.symbol = '';
				$scope.error = true;
				$scope.success = false;
				$scope.message = 'You\'ve already added that stock silly!';
			}
		});
	};
}]);