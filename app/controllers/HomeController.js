app.controller('HomeController', ['$scope', '$http', 'stocks', 'auth', 'yahoo', function($scope, $http, stocks, auth, yahoo) {
	$scope.stocks = stocks.stocks;
	$scope.isLoggedIn = auth.isLoggedIn;
	// stocks.getStocks().success(function(data) {
	// 	$scope.stocks = data;
	// });

	$scope.addStock = function() {
		if (!$scope.symbol || $scope.symbol === '') {
			return;
		}

		// Get the stock data from Yahoo API
		yahoo.get($scope.symbol).success(function(response) {
			if (response.query.count > 0) {
				var stockData = response.query.results.quote;

				console.log("FROM YAHOO:");
				console.log(stockData);

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

			}
		});


		$scope.symbol = '';
	};
}]);