app.controller('HomeController', ['$scope', '$http', 'stocks', function($scope, $http, stocks) {
	stocks.getStocks().success(function(data) {
		$scope.stocks = data;
	});
	// $scope.stocks = [
	// 	{
	// 		symbol: "W",
	// 		price: "32.43",
	// 		open: "43.12",
	// 		close: "31.43"
	// 	},
	// 	{
	// 		symbol: "FIT",
	// 		price: "38.43",
	// 		open: "41.12",
	// 		close: "33.43"
	// 	},
	// ];

	// var symbols = $http.get('http://localhost:8000/app/components/symbols.json');
	// var dbStock = symbols.success(function(data) {
	// 	var data = {
	// 		symbol: "TEST",
	// 		price: "32.43",
	// 		open: "43.12",
	// 		close: "31.43"
	// 	};
	// 	stocks.getStocks().success(function(data) {
	// 		return data;
	// 		// if (data.query.count > 0) {
	// 		// 	$scope.stocks = data.query.results.quote;
	// 		// }
	// 	});
	// });

	$scope.addStock = function() {
		console.log('add stiock');
		if (!$scope.symbol || $scope.symbol === '') {
			return;
		}

		data = {
			symbol: $scope.symbol,
			price: "12.12",
			open: "23.12",
			close: "45.43"
		}

		$scope.stocks.push(data);

		$scope.symbol = '';
	};
}]);