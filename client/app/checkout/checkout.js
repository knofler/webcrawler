'use strict';

angular.module('webcrawler')
  .config(function ($stateProvider) {
    $stateProvider
      .state('checkout', {
        url: '/checkout',
        templateUrl: 'app/checkout/checkout.html',
        controller: 'CheckoutCtrl'
      });
  });