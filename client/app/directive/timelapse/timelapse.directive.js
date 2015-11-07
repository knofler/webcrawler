'use strict';

angular.module('webcrawler')
  .directive('timelapse', function () {
    return {
      templateUrl: 'app/directive/timelapse/timelapse.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });