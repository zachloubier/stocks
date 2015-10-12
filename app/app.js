'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('Stocks', ['ngRoute', 'ngResource']);

app.config(function($routeProvider) {
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
    // resolve: {
    //   postPromise: ['$routeParams', 'stocks', function($routeParams, stocks) {
    //     console.log($routeParams);
    //     return stocks.get($routeParams.symbol)
    //   }]
    // }
  })
  .when('/users/new', {
    controller: 'UsersController',
  })
  .otherwise({
  	redirectTo: '/'
  });
});