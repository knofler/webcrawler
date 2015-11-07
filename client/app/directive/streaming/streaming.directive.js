'use strict';

angular.module('webcrawler')
  .directive('streaming', function () {
    return {
      templateUrl: 'app/directive/streaming/streaming.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });