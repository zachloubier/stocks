app.factory('stocks', ['$http', function($http) {
	return function(symbol) {
		var symbols;
		if (symbol.constructor === Array) {
			symbols = symbol.join('","');
		} else {
			symbols = symbol;
		}

		var endPoint = 'https://query.yahooapis.com/v1/public/yql?q=',
				query = "select * from yahoo.finance.quotes where symbol IN(\"" + symbols + "\")",
				args = "&format=json&env=http://datatables.org/alltables.env",
				url = endPoint + encodeURIComponent(query) + args;

		return $http.get(url)
			.success(function(data) {
				return data;
			})
			.error(function(data) {
				return data;
			});
	}

}]);