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
  }

  var redirectLogin = function() {
    return {
      load: function($q, $location, auth) {
        var deferred = $q.defer();
        deferred.resolve();

        if (auth.isLoggedIn()) {
          return deferred.promise;
        } else {
          return $location.path('/');
        }
      }
    }
  }


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
    resolve: {
      postPromise: ['auth', function(auth) {
        if (auth.isLoggedIn()) {
          window.location.replace('http://localhost:8000/app/index.html');
        }
      }]
    }
  })
  .when('/login', {
    controller: 'AuthController',
    templateUrl: 'views/users/login.html',
    resolve: {
      load: function($q, $location, auth) {
        var deferred = $q.defer();
        deferred.resolve();

        if (auth.isLoggedIn()) {
          return $location.path('/');
        }
      }
      // postPromise: ['auth', function(auth) {
      //   if (auth.isLoggedIn()) {
      //     window.location.replace('http://localhost:8000/app/index.html');
      //   }
      // }]
    }
  })
  .otherwise({
  	redirectTo: '/'
  });
});