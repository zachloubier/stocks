app.directive('stockInfo', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: 'directives/stockInfo.html'
  }; 
});