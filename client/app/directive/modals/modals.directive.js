'use strict';

angular.module('webcrawler')
   .directive('modals', function () {
    return {
      templateUrl: 'app/directive/modals/modals.html',
     restrict: 'E',
    scope: {
      show: '=',
      close : '&hide'
    },
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    }
    };
  });