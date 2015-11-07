'use strict';

angular.module('webcrawler')
  .directive('fileUpload', function (FileUploader) {
    return {
      templateUrl: 'app/directive/file-upload/file-upload.html',
      restrict: 'EA',
      scope:{
       uploader   :'='
      },
      link: function (scope, element, attrs) {


        console.log("upload :: ", scope.uploader);

        //IMAGE UPLOAD VARIABLE
        var mediaLocation   = '';
        var cloudinary_url  = 'http://res.cloudinary.com/hwzu6pqt4/image/upload/';
        var preset_url      = '/assets/images/uploads/';
        var preset_url_dist = '/assets/img/uploads/';

        //CLOUDINARY IMAGE UPLOAD
        scope.uploader.onBeforeUploadItem = function(fileItem) {
          //clean the upload queue everytime before upload starts
          scope.uploader.queue = [];
          console.info('onBeforeUploadItem', fileItem);
          // scope.formdata['img'] = preset_url+scope.data.model+"/"+fileItem.file.name
          // console.info('image name before space removal is ', fileItem.file.name);
          var noSpaceFileName = fileItem.file.name.replace(/\s/g, '')
          console.log('file name after space removal is ', noSpaceFileName)
          mediaLocation = preset_url+noSpaceFileName;
          scope.url = mediaLocation;
          console.log("scope.url",scope.url);
         };

         $("#filedrop").on('drop',function(e){
         	$("#display_csv_panel").empty();
         	_.each(scope.uploader.queue,function(data){
         		data.upload();
         	})
         	console.log("file dropped event fired")
         })

         $(".fileselect").change(function(){
         	$("#display_csv_panel").empty();
         	_.each(scope.uploader.queue,function(data){
         		data.upload();
         	})
         	console.log("file select event fired")
         })


      }//end of link
    };//end of return
  });//end of directive