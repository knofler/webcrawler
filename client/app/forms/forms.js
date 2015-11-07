'use strict';

angular.module('webcrawler')
  .config(function ($stateProvider) {
    $stateProvider
      .state('forms', {
        url: '/forms',
        templateUrl: 'app/forms/forms.html',
        controller: 'FormsCtrl'
      });
  });