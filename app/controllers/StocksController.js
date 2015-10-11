app.controller('StocksController', ['$scope', 'stocks', '$routeParams', function($scope, stocks, $routeParams) {
	stocks.get($routeParams.symbol).then(function(stock) {
		console.log(stock.data);
		$scope.stock = stock.data;
	});
}]);