app.factory('stocks', ['$http', function ($http) {
  return {
    stocks: [],

    getAll: function () {
      var self = this;
      return $http.get('http://localhost:3000/stocks')
        .success(function (data) {
          angular.copy(data, self.stocks);
          // return data;
        })
        .error(function (data) {
          return data;
        });
    },

    get: function (symbol) {
      var self = this;
      return $http.get('http://localhost:3000/stocks/' + symbol)
        .success(function (data) {
          return data;
        });
    },

    create: function (data) {
      var self = this;
      return $http.post('http://localhost:3000/stocks', data)
        .success(function (data) {
          self.stocks.push(data);
        })
        .error(function (data) {
          return data;
        })
    }
  }

}]);