app.controller('HomeController', ['$scope', '$http', 'stocks', function($scope, $http, stocks) {
	var symbols = $http.get('http://localhost:8000/app/components/symbols.json');
	symbols.success(function(data) {
		stocks(data).success(function(data) {
			if (data.query.count > 0) {
				$scope.stocks = data.query.results.quote;
			}
		});
	});
}]);