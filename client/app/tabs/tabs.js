'use strict';

angular.module('webcrawler')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tabs', {
        url: '/tabs',
        templateUrl: 'app/tabs/tabs.html',
        controller: 'TabsCtrl'
      });
  });