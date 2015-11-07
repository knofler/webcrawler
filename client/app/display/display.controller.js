'use strict';

angular.module('webcrawler')
  .controller('DisplayCtrl', function ($scope) {

  //define contents name and info has to be in right order
  $scope.sample_display     = {
      fields  : [ 
                  {'name':'img'},
                  {'name':'title'},
      			      {'name':'article'}
      			  ],
      url     : '/api/displays/',
      model   : 'display'
     };  
  //define contents name and info has to be in right order
  $scope.cart_display     = {
        url      : '/api/carts/',
        model    : 'cart',
        shopping : '/canteen',
        checkout : '/checkout'
       }; 

  });
