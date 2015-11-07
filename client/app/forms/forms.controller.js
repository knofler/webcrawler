'use strict';

angular.module('webcrawler')
  .controller('FormsCtrl', function ($scope,$http,socket) {

    $scope.forms = {
        fields  : [ {'name':'name','type':'input'},
                    {'name':'info','type':'select'}
                   ],
        url     : '/api/things/'
        // model   : 'thing',
        // options :  [  {'name':'school','items':['school','college','university']},
        //               {'name':'food','items':['bread','wine','apple']},
        //               {'name':'hobby','items':['code','swiming','poetry']}
        //             ]
        } ;                     
    $scope.formsPhotoMob = {};    
        
    $scope.awesomeThings = [];

    $scope.modalShown    = false;
    $scope.dynamic_forms = {};
  
    //Functions
    $scope.addFormModal         = function () {
      $scope.modalShown = !$scope.modalShown;
      $scope.dynamic_forms = $scope.forms;
      console.log("scope.dynamic_forms is:: ", $scope.dynamic_forms)
      // alert("Food Modal")
     };
    $scope.photoMod             = function () {
      $scope.modalShown = !$scope.modalShown;
      $scope.dynamic_forms = $scope.formsPhotoMob;
      console.log("scope.dynamic_forms is:: ", $scope.dynamic_forms)
      // alert("Food Modal")
      };
    //pass functions to modal
    $scope.close_directive_modal = function(){
      $scope.modalShown    = false;
      console.log("I am from checkout directive and I have been executed")
     };  

    // ########## API CALLS and Promises #################
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
      });


  });
