app.factory('yahoo', ['$http', function($http) {
  return {
    get: function(symbol) {
      var endPoint = 'https://query.yahooapis.com/v1/public/yql?q=',
        query = "select * from yahoo.finance.quotes where symbol = \"" + symbol + "\"",
        args = "&format=json&env=http://datatables.org/alltables.env",
        url = endPoint + encodeURIComponent(query) + args;

      return $http.get(url)
        .success(function (data) {
          return data;
        })
        .error(function (data) {
          return data;
        });

    }
  }
}]);