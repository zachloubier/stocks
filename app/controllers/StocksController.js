app.controller('StocksController', ['$scope', 'stocks', '$routeParams', function($scope, stocks, $routeParams) {
	stocks($routeParams.id).success(function(data) {
		console.log(data.query.results.quote);
	});
}]);