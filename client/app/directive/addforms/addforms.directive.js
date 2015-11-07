'use strict';

angular.module('webcrawler')
  .directive('addforms', function ($http,socket,Auth,FileUploader) {
    return {
      templateUrl: 'app/directive/addforms/addforms.html',
      restrict: 'EA',
      scope:{
        data   :'=',
        image  :'=', 
        multiple: '=',
        closeModal:'&modalctrl'
      },
      link: function (scope, element, attrs) {

        //control multiple image upload with this conditions
          // console.log("scope.multiple :: ",scope.multiple)
          var queueNumber ;
          if(scope.multiple === false){
              queueNumber =1;
            }
            else{
              queueNumber = 25;
            }
          // console.log("queueNumber :: ",queueNumber)
        
        //instantiate Fileuploader to pass on to photos directive
        scope.uploader = new FileUploader({
            // url: '/uploads'
            queueLimit: queueNumber
         });

        console.log("upload :: ", scope.uploader);

        console.log("scope.data is ", scope.data.options);

        //Control select options with conditions
          // scope.noOptions = true;
          // if(scope.data.options === undefined){
          //   scope.noOptions = true;
          //  }else{
          //   scope.noOptions = false;
          //  }

      	//Object holds formdata
      	scope.formdata = {};

      	  //get user info
        scope.getCurrentUser = Auth.getCurrentUser;

        // Collect User Geo Location using geo-location element    
        scope.getLatitude  = '';
        scope.getLongitude = '';
        
        scope.loc = document.querySelector('geo-location');
        console.log("scope.loc is :: ", scope.loc)

        
        scope.loc.addEventListener('geo-response', function(e) {
          scope.getLatitude  = this.latitude;
          scope.getLongitude = this.longitude;
          console.log('lat:' + scope.getLatitude,'lng:' + scope.getLongitude);
         });   

        //IMAGE UPLOAD VARIABLE
        var mediaLocation   = [];
        var cloudinary_url  = 'http://res.cloudinary.com/hwzu6pqt4/image/upload/';
        var preset_url      = '/assets/images/uploads/';
        var preset_url_dist = '/assets/img/uploads/';
        
        //get image name from uploadsed image

        //CLOUDINARY IMAGE UPLOAD
        scope.uploader.onBeforeUploadItem = function(fileItem) {
          console.info('onBeforeUploadItem', fileItem);
          // scope.formdata['img'] = preset_url+scope.data.model+"/"+fileItem.file.name
          // console.info('image name before space removal is ', fileItem.file.name);
          var noSpaceFileName = fileItem.file.name.replace(/\s/g, '')
          console.log('image name after space removal is ', noSpaceFileName)
          mediaLocation.push(cloudinary_url+noSpaceFileName);
          scope.formdata['img'] = mediaLocation;
          console.log("scope.formdata",scope.formdata);
         };
  
        // LOCAL IMAGE UPLOAD
        // $scope.uploader.onBeforeUploadItem = function(fileItem) {
        //   console.info('onBeforeUploadItem', fileItem);
        //     mediaLocation.push(preset_url+fileItem.file.name);
        //   console.log("media location is: ",mediaLocation);
        //  };
  
    
      
        //Add forms data to database
        scope.addform = function () {
          scope.formdata['created_at'] = new Date();
          scope.formdata['created_by'] = scope.getCurrentUser().name;   
          scope.formdata['latitude'] = scope.getLatitude;
          scope.formdata['longitude'] = scope.getLongitude;
          console.log("scope.formdata is : ", scope.formdata);
          $http.post(scope.data.url,scope.formdata).success(function(){
            console.log("datachange emits")
            //this socket has emited for display class to reinitiate in pinterest style display page if real time display available
            socket.socket.emit('datachange',{data:"Change model"});
          });
          scope.formdata = {};
          scope.closeModal();
         }; 

      }
    };
  });