app.controller('HomeController', ['$scope', '$http', 'stocks', function($scope, $http, stocks) {
	stocks.getStocks().success(function(data) {
		$scope.stocks = data;
	});

	$scope.addStock = function() {
		if (!$scope.symbol || $scope.symbol === '') {
			return;
		}

		var stock = {
			symbol: $scope.symbol,
			price: "12.12",
			open: "23.12",
			close: "45.43"
		}

		stocks.addStock(stock).success(function(data) {
			console.log(data);
			$scope.newId = data;
			$scope.stocks.push(stock);
		});


		$scope.symbol = '';
	};
}]);