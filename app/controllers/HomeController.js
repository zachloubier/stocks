app.controller('HomeController', ['$scope', 'stocks', function($scope, stocks) {
	stocks.success(function(data) {
		$scope.stocks = data;
	});
}]);