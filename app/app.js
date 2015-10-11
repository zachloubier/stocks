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
  .when('/stocks/:id', {
  	controller: 'StocksController',
  	templateUrl: 'views/stocks/stock.html'
  })
  .otherwise({
  	redirectTo: '/'
  });
});