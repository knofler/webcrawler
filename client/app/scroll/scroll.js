'use strict';

angular.module('webcrawler')
  .config(function ($stateProvider) {
    $stateProvider
      .state('scroll', {
        url: '/scroll',
        templateUrl: 'app/scroll/scroll.html',
        controller: 'ScrollCtrl'
      });
  });