'use strict';

angular.module('webcrawler')
  .config(function ($stateProvider) {
    $stateProvider
      .state('speak', {
        url: '/speak',
        templateUrl: 'app/speak/speak.html',
        controller: 'SpeakCtrl'
      });
  });