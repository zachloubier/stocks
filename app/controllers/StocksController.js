app.controller('StocksController', ['$scope', 'stocks', '$routeParams', function($scope, stocks, $routeParams) {
	stocks.success(function(data) {
		for (var i = 0; i < data.length; i++) {
			if (data[i].Symbol == $routeParams.id) {
				$scope.stock = data[i];
			}
		}
	});
}]);