'use strict';

angular.module('webcrawler')
  .config(function ($stateProvider) {
    $stateProvider
      .state('monad', {
        url: '/monad',
        templateUrl: 'app/monad/monad.html',
        controller: 'MonadCtrl'
      });
  });