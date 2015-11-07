'use strict';

angular.module('webcrawler')
  .config(function ($stateProvider) {
    $stateProvider
      .state('display', {
        url: '/display',
        templateUrl: 'app/display/display.html',
        controller: 'DisplayCtrl'
      });
  });