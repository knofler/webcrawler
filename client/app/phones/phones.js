'use strict';

angular.module('webcrawler')
  .config(function ($stateProvider) {
    $stateProvider
      .state('phones', {
        url: '/phones',
        templateUrl: 'app/phones/phones.html',
        controller: 'PhonesCtrl'
      });
  });