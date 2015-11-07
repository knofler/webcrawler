'use strict';

angular.module('webcrawler')
  .directive('fastNg', function () {
    return {
      // templateUrl: 'app/main/main.html',
      restrict: 'E',
      scope:{
        framework:'='
      },
      link: function (scope, el, attrs) {
      	scope.$watch('framework', function(newValue, oldValue){
            React.renderComponent(
              MYAPP({framework:newValue}),
              el[0]
            );
        })
      }
    };
  });