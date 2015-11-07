'use strict';

angular.module('webcrawler')
  .controller('CartCtrl', function ($scope) {
    //define contents name and info has to be in right order
    $scope.cart_display     = {
        url      : '/api/carts/',
        model    : 'cart',
        shopping : '/display',
        checkout : '/checkout'
       }; 				  			  

  });
