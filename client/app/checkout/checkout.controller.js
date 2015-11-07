'use strict';

angular.module('webcrawler')
  .controller('CheckoutCtrl', function ($scope,main,Auth,userInfo) {
    $scope.message = 'Hello';

    // #*##*#M#*##*##*#MODAL SETUP#*##*##*##*##*##*#  
    //variables
    $scope.modalShown    = false;
    $scope.dynamic_forms = {};

    // get totalcost value from main class
    $scope.totalCost =  main.totalCost;

    $scope.hasWriteAccess("checkout",Auth.getCurrentUser().email);
    $scope.hasFullAccess("checkout",Auth.getCurrentUser().email);


    //Functions
    $scope.invoiceModal    = function () {
      $scope.modalShown = !$scope.modalShown;
      // $scope.dynamic_forms = $scope.food_forms;
      // alert("Food Modal")
     }; 
    // #*##*#M#*##*##*#MODAL SETUP#*##*##*##*##*##*#  


    // define orders detail for checkout directives
    $scope.order_display = {
    	url:'/api/orders',
      model:'order',
    	cart:'/cart'
    };

  });
