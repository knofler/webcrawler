'use strict';

angular.module('webcrawler')
  .config(function ($stateProvider) {
    $stateProvider
      .state('csv', {
        url: '/csv',
        templateUrl: 'app/csv/csv.html',
        controller: 'CsvCtrl'
      });
  });