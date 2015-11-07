// 'use strict';

angular.module('webcrawler')
  .controller('PolymerCtrl', function ($scope, $http, socket) {
    // @@@@@@@@@@@@@@@@@@@ DATA SOURCES and Models @@@@@@@@@@@@@@@@@@@@@@@
  $scope.awesomeThings = [];
  $scope.formdata      = {};

  
  // ########## API CALLS and Promises #################
  $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
      });
    
  // Functions interating with api calls and rendering pages
  $scope.addThing    = function() {
    if($scope.newThing === '') {
      return;
    }
    $http.post('/api/things', { name: $scope.newThing });
    $scope.newThing = '';
    };
  $scope.deleteThing = function(thing) {
    $http.delete('/api/things/' + thing._id);
   };


 //Open Mail modal (paper dialog,which will pass data through data binding and process email)  
  $scope.mailModal   = function(){
      $scope.formdata = {};
      document.getElementById('emailModal').toggle();
     }; 
  // Send email using nodemailer   
  $scope.sendMail    = function (){
      setTimeout(function(){
         $http.post("/api/emails/", {
          to:$scope.formdata.mailTo,
          from:"nodemailer.me@gmail.com",
          subject:$scope.formdata.mailSubject,
          text:$scope.formdata.mailText
        }).success(function(email){
          console.log(email)
       }); 
          // console.log($scope.formdata.mailTo,"nodemailer.me@gmail.com",$scope.formdata.mailSubject,$scope.formdata.mailText)
      // alert("I have been clicked"); 
      },200);
      };
  // ########## Event Controls with socketio #########
  $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
      });
  
  });

  