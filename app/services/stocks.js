app.factory('stocks', ['$http', function($http) {
	var endPoint = 'https://query.yahooapis.com/v1/public/yql?q=',
			symbols = [
				"W",
				"FIT"
			],
			query = "select * from yahoo.finance.quotes where symbol IN(\"" + symbols.join('","') + "\")",
			args = "&format=json&env=http://datatables.org/alltables.env",
			url = endPoint + encodeURIComponent(query) + args;

	return $http.get('http://localhost:8000/app/components/stocks.json');

	// return $http.get(url)
	// .success(function(data) {
	// 	return data;
	// })
	// .error(function(data) {
	// 	return data;
	// });
}]);