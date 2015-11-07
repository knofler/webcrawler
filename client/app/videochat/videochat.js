'use strict';

angular.module('webcrawler')
  .config(function ($stateProvider) {
    $stateProvider
      .state('videochat', {
        url: '/videochat',
        templateUrl: 'app/videochat/videochat.html',
        controller: 'VideochatCtrl'
      });
  });