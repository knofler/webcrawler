'use strict';

angular.module('webcrawler')
  .directive('poll', function () {
    return {
      templateUrl: 'app/directive/poll/poll.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });