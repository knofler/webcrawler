'use strict';

angular.module('webcrawler')
  .config(function ($stateProvider) {
    $stateProvider
      .state('polymer', {
        url: '/polymer',
        templateUrl: 'app/polymer/polymer.html',
        controller: 'PolymerCtrl'
      });
  });