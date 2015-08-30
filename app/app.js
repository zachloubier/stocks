'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('Stocks', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider.when('/', {
  	controller: 'HomeController',
  	templateUrl: 'views/stocks/list.html'
  })
  .when('/stocks/:id', {
  	controller: 'StocksController',
  	templateUrl: 'views/stocks/view.html'
  })
  .otherwise({redirectTo: '/stocks'});
});