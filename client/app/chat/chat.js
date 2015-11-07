'use strict';

angular.module('webcrawler')
  .config(function ($stateProvider) {
    $stateProvider
      .state('chat', {
        url: '/chat',
        templateUrl: 'app/chat/chat.html',
        controller: 'ChatCtrl'
      });
  });