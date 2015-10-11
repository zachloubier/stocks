app.factory('stocks', ['$http', function($http) {
	return {
		stocks: [],
		getAll: function() {
			var self = this;
			var response;
			return $http.get('http://localhost:3000/stocks')
				.success(function(data) {
					angular.copy(data, self.stocks);
					// return data;
				})
				.error(function(data) {
					return data;
				});
			// 	var url;
			// 	if (symbols.constructor === Array) {
			// 		url = 'http://localhost:3000/getStocks?symbols=' + symbols.join(',');
			// 	} else {
			// 		url = 'http://localhost:3000/getStock?symbol=' + symbol;
			// 	}

			// 	response = $http.get(url)
			// 		.success(function(data) {
			// 			return data;
			// 		})
			// 		.error(function(data) {
			// 			return data;
			// 		});
			// }

			return response;
		},

		create: function(data) {
			var self = this;
			return $http.post('http://localhost:3000/stocks', data)
				.success(function(data) {
					self.stocks.push(data);
				})
				.error(function(data) {
					return data;
				})
		}
	}

}]);