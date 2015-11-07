// 'use strict';

angular.module('webcrawler')
  .controller('MainCtrl', function ($scope, $http, socket, $location, $anchorScroll) {
    
  // @@@@@@@@@@@@@@@@@@@ DATA SOURCES and Models @@@@@@@@@@@@@@@@@@@@@@@


  
  // scroll to feature included for SPA App
  $scope.scrollTo    = function(id) {
      $location.hash(id);
      $anchorScroll();
     };

  });

  

