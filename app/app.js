'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('Stocks', ['ngRoute', 'ngResource']);
// console.log(location);
app.config(function($routeProvider) {

  var requireAuth = function() {
    return {
      load: function($q, $location, auth) {
        var deferred = $q.defer();
        deferred.resolve();

        if (auth.isLoggedIn()) {
          return deferred.promise;
        } else {
          return $location.path('/login');
        }
      }
    }
  };

  var redirectLogin = function() {
    return {
      load: function($q, $location, auth) {
        var deferred = $q.defer();
        deferred.resolve();

        if (auth.isLoggedIn()) {
          return $location.path('/');
        } else {
          return deferred.promise;
        }
      }
    }
  };


  // console.log($location);
  $routeProvider.when('/', {
  	controller: 'HomeController',
  	templateUrl: 'views/home/home.html',
    resolve: {
      postPromise: ['stocks', function(stocks) {
        return stocks.getAll();
      }]
    }
  })
  .when('/stocks/:symbol', {
  	controller: 'StocksController',
  	templateUrl: 'views/stocks/stock.html',
    resolve: requireAuth()
  })
  .when('/register', {
    controller: 'AuthController',
    templateUrl: 'views/users/register.html',
    resolve: redirectLogin()
  })
  .when('/login', {
    controller: 'AuthController',
    templateUrl: 'views/users/login.html',
    resolve: redirectLogin()
  })
  .otherwise({
  	redirectTo: '/'
  });
});