'use strict';

angular.module('webcrawler')
  .directive('invoice', function () {
    return {
      templateUrl: 'app/directive/invoice/invoice.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });