'use strict';

angular.module('webcrawler')
  .config(function ($stateProvider) {
    $stateProvider
      .state('template', {
        url: '/template',
        templateUrl: 'app/template/template.html',
        controller: 'TemplateCtrl'
      });
  });