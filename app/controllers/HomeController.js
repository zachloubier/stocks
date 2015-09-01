app.controller('HomeController', ['$scope', 'stocks', function($scope, stocks) {
	stocks.success(function(data) {
		// if (data.query.count > 0) {
			// $scope.stocks = data.query.results.quote;
		// }

		// Used for no internet access only
		$scope.stocks = data;
		console.log(data);
	});
}]);