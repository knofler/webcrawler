'use strict';

angular.module('webcrawler')
  .directive('arrayDisplay', function () {
    return {
      templateUrl: 'app/directive/arrayDisplay/arrayDisplay.html',
      restrict: 'EA',
      scope:{
      	datamodel:'='
      },
      link: function (scope, element, attrs) {
      }
    };
  });