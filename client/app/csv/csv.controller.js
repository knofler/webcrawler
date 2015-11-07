'use strict';

angular.module('webcrawler')
  .controller('CsvCtrl', function ($scope,FileUploader) {
 	
 	// define csv path to display by the directive mostly used programatically used	
 	// $scope.url      = "assets/dataDir/apps.csv";
 	//define coldata to be used as col head
  	// $scope.coldata  = ['MachineName','PrimaryUser','SystemManufacturer','SystemProduct','SystemModel','CPUProduct','CPU Speed(MHz)','Device CreateDate','Hard DiskSpace','Free DiskSpace','IP Address'];

	
	//instantiate Fileuploader to pass on to photos directive
	$scope.uploader = new FileUploader({
	    // url: '/uploads'
	    // queueLimit: queueNumber
	 });

  });
