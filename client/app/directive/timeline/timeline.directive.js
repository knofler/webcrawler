'use strict';

angular.module('webcrawler')
  .directive('timeline', function () {
    return {
      templateUrl: 'app/directive/timeline/timeline.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });